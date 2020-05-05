# Пишем приложение DevSchacht на React Native. Часть 2.

Прошло довольно много времени с выхода [первой части этой статьи](https://medium.com/devschacht/create-devschacht-app-part-1-db9570cf3f9b). К сожалению, я был очень занят, что не является оправданием, но всё же я надеюсь на некоторое понимание :)

Итак, мы остановились на том, что создали приложение, выводящее на экран фразу «Привет, мир». В этой статье мы попробуем отрисовать полноценный интерфейс. Так же мы разберёмся, что такое состояние приложения, где и как его хранить (спойлер, мы будем использовать Redux). Наш прототип (пока) будет состоять из двух вкладок: статьи и подкасты.

По старой iOS-традиции кнопки переключения вкладок будут расположены внизу экрана.

![](https://cdn-images-1.medium.com/max/1600/1*uQPCM46PUa5CurmVG5iM5Q.png)

Совершенно не удивительно, что в React Native есть готовый компонент для такой раскладки приложения. Он называется [`TabBarIOS`](http://facebook.github.io/react-native/releases/next/docs/tabbarios.html). Удивительно другое: такого компонента нет для Android. А, значит, в дальнейшем мы получим проблемы с портированием.

Как этого избежать? Мы можем сами реализовать необходимые нам компоненты или скачать готовый набор компонент. В этом сила компонентного подхода!

 ## Подключаем стороннюю библиотеку компонент

Один из наиболее популярных наборов компонент это [`NativeBase.io`](http://nativebase.io/). В этой библиотеке представлен огромный выбор базовых компонент на любой вкус. И есть то, что нам нужно — [`FooterTab`](https://docs.nativebase.io/Components.html#footer-tabs-def-headref).

Устанавливаем библиотеку в наш проект и пробуем.

```
$ npm install native-base@2.1.5 --save
$ npx react-native link
$ npm install @expo/vector-icons --save
```

Небольшое уточнение по поводу версии `native-base`. В мире React Native всё течёт и изменяется каждый день. Выходящие новые версии компонент зачастую содержат ошибки и нестабильность. На момент написания этой статьи хорошо работала связка:

```
"@expo/vector-icons": "^5.0.0",
"expo": "^18.0.3",
"native-base": "^2.1.5",
"react": "16.0.0-alpha.12",
"react-native": "0.45.1"
```

По слухам, неплохо работает связка

```
"native-base": "2.2.0",
"react-native": "0.46.0"
```

Но вы же понимаете, что так дела не делаются :) Будем надеяться, что совместными усилиями разработчиков ситуация быстро придёт в норму.

## Пишем первые функциональные компоненты

Попробуем написать наше первое приложение с использованием полноценных компонент (а не просто текста, как в первой части). Для начала перепишем всё на [функциональные компоненты](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d). Что же это такое?

В `React 0.14` появился новый способ определения компоненты, позволяющий создавать её с помощью компактной стрелочной функции вместо громоздкого класса. Этот способ хорош практически всегда, кроме тех случаев, когда вам нужна компонента с внутренним состоянием (а так как мы будем использовать `Redux`, то скорее всего нам такие компоненты не понадобятся).

Функциональные React-компоненты проще и надёжней. В них нет состояния, их легко читать и тестировать и в них сложней допустить ошибку. Рассмотрим на примере App.js, который мы получили из `Create React Native App`:

```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

В синтаксисе функциональных компонент это будет так:

```javascript
import React from 'react';
import {Container, Content} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const App = () => (
	<View style={styles.container}>
		<Text>Open up App.js to start working on your app!</Text>
		<Text>Changes you make will automatically reload.</Text>
		<Text>Shake your phone to open the developer menu.</Text>
	</View>
);

export default App;
```

Так гораздо понятней! Можно заметить, что практически чистая компонента создаётся в данном случае нечистой функцией: у нас есть зависимость от внешней переменной `styles`. Попробуем избавиться от этой зависимости позже.

Вернёмся к нашему приложению. Перепишем `App.js`, используя компоненты из библиотеки `native-base`:

```javascript
import React from 'react';
import {Container, Content} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import AppFooter from './components/AppFooter.js';

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
});

const App = () => (
	<Container>
		<Content>
			<View style={styles.container}>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat.
				</Text>
			</View>
		</Content>
		<AppFooter/>
	</Container>
);

export default App;
```

Мы видим новый компонент `<AppFooter/>`, который нам предстоит создать. Идём в папку `./components/` и создаём файл `AppFooter.js` со следующим содержимым:

```javascript
import React from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';

const AppFooter = () => (
	<Footer>
		<FooterTab>
			<Button active>
				<Text>Статьи</Text>
			</Button>
			<Button>
				<Text>Подкасты</Text>
			</Button>
		</FooterTab>
	</Footer>
);

export default AppFooter;
```

Всё готово для того, чтобы попробовать собрать наше приложение! Открываем `Expo XDE`, выбираем наш проект, запускаем и открываем в симуляторе. Ого, похоже на наш скетч!

![](https://cdn-images-1.medium.com/max/800/1*2z1BHsS7AknLfgC8SM5kQw.png)

## Подключаем Redux

Наши кнопки пока не умеют переключаться. Пора их научить. Для этого нужно сделать две вещи: научиться обрабатывать событие клика и научиться хранить состояние (state). Начнём с состояния. Так как мы отказались от хранения состояния в компоненте, сделав выбор в пользу чистых компонент и глобального стора, то будем использовать [Redux](http://redux.js.org).

Что такое Redux? Это потрясающе маленькая библиотека, разработанная петербургским (на тот момент) программистом [Дэном Абрамовым](https://twitter.com/dan_abramov) и ставшая de facto стандартом в React-мире, вытеснив популярный ранее [Flux](http://facebook.github.io/flux/) от Facebook. Основная идея Redux в том, что в приложении существует один глобальный стор (store) — хранилище состояния. Стор является иммутабельным — он никогда не изменяется, вместо этого на каждое изменение создаётся новая копия стора и распространяется сверху вниз по всем компонентам. Компоненты никогда не пишут в стор напрямую, они создают экшены — события, которые должны повлиять на стор. Эти события обрабатываются редьюсерами, которые и порождают новый стор. Звучит пугающе, но на деле очень просто.

Прежде всего, мы должны создать наш стор.

```javascript
import {createStore} from 'redux';
const initialState = {};
const store = createStore(reducers, initialState);
```

Здесь мы видим использование команды `react-native link`. Эта команда нужна для того, чтобы подтянуть в ваше приложение нативные реализации компонент, зависимости от которых указаны в `package.json`.

Мы видим, что в данном случае на вход функции `createStore` передаётся два параметра: `reducers` — набор редьюсеров и `initialState` — объект начального состояния.

Давайте создадим заготовку для редьюсеров. В папке `reducers` создаём файл `index.js` со следующим содержимым:

```javascript
export default (state = [], action) => {
	switch (action.type) {
		default:
			return state
	}
};
```

Подключаем редьюсеры к App.js:

```javascript
import reducers from './reducers';
```

Теперь нам необходимо распространить наш стор по компонентам. Делается это с помощью специально компоненты `<Provider>`. Подключаем её в проект:

```javascript
import {Provider} from 'react-redux';
```

И оборачиваем все компоненты в `<Provider store={store}>`. Обновленный `App.js` выглядит так:

```javascript
import React from 'react';
import {Container, Content} from 'native-base';
import {StyleSheet, Text, View} from 'react-native';
import AppFooter from './components/AppFooter.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from './reducers';

const initialState = {};
const store = createStore(reducers, initialState);

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
});

const App = () => (
	<Provider store={store}>
		<Container>
			<Content>
				<View style={styles.container}>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
						et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Text>
				</View>
			</Content>
			<AppFooter/>
		</Container>
	</Provider>
);

export default App;
```

Теперь наше приложение может хранить своё состояние. Давайте воспользуемся этим. Добавляем состояние `mode`, по умолчанию установленное в `ARTICLES`. Это означает, что при первом рендере наше приложение будет установлено в состояние показа списка статей.

```javascript
const initialState = {
	mode: 'ARTICLES'
};
```

Неплохо, но ручное написание строковых значений ведёт к потенциальным ошибкам. Давайте заведём константы. Создаём файл `./constants/index.js` со следющим содержимым:

```javascript
export const MODES = {
	ARTICLES: 'ARTICLES',
	PODCAST: 'PODCAST'
};
```

И переписываем `App.js`:

```javascript
import {MODES} from './constants';

const initialState = {
	mode: MODES.ARTICLES
};
```

Отлично, состояние есть, пора передать его в компоненту футера. Давайте ещё раз посмотрим наш `./components/AppFooter.js`:

```javascript
import React from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';

const AppFooter = () => (
	<Footer>
		<FooterTab>
			<Button active>
				<Text>Статьи</Text>
			</Button>
			<Button>
				<Text>Подкасты</Text>
			</Button>
		</FooterTab>
	</Footer>
);

export default AppFooter;
```

Как мы видим, состояние переключателя определяется с помощью свойства `active` у компоненты `<Button>`. Прокинем до `<Button>` текущее состояние приложения. Делается это не сложно, основную подкапотную работу берёт на себя компонент `<Provider>`, который мы подключили ранее. Остаётся только взять из него текущее состояние и положить в свойcтва (props) компоненты `<AppFooter>`.

Есть одна загвоздка — идеологическая. По принятому соглашению мы не можем напрямую работать с состоянием приложения в компоненте. Это связано с тем, что компонента должна быть независимой и отделяемой, а следовательно, не должна знать ничего о нашем приложении. Всё общение с компонентой происходит через `props`. Это так называемая «глупая компонента», которая отвечает только за отображение. За связь с приложением отвечает «умная компонента», в терминах Redux — контейнер. Иначе говоря, если мы хотим, чтобы наша компонента была связана с состоянием приложения, то мы должны положить её в контейнер.

Первым делом, модифицируем наш `<AppFooter>` так, чтобы состоянием кнопок можно было управлять, передавая `mode` через `props`:

```javascript
import React from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {MODES} from "../constants";

const AppFooter = ({mode = MODES.ARTICLES}) => (
	<Footer>
		<FooterTab>
			<Button active={mode === MODES.ARTICLES}>
				<Text>Статьи</Text>
			</Button>
			<Button active={mode === MODES.PODCAST}>
				<Text>Подкасты</Text>
			</Button>
		</FooterTab>
	</Footer>
);

export default AppFooter;
```

Теперь приступим к созданию контейнера. Создадим файл `./containers/AppFooterContainer.js`.

```javascript
import React from 'react';
import AppFooter from '../components/AppFooter.js';
import {MODES} from "../constants";

const AppFooterContainer = () => (
	<AppFooter mode={MODES.ARTICLES} />
);

export default AppFooterContainer;
```

И подключим контейнер `<AppFooterContainer>` в `App.js` вместо компоненты `<AppFooter>`. Пока наш контейнер ничем не отличается от компоненты, но всё изменится как только мы подключим его к состоянию приложения. Сделаем это!

```javascript
import React from 'react';
import AppFooter from '../components/AppFooter.js';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
	mode: state.mode
});

const AppFooterContainer = ({mode}) => (
	<AppFooter mode={mode} />
);

export default connect(
	mapStateToProps
)(AppFooterContainer);
```

Весьма функционально! Все функции стали чистыми. Что тут происходит? Мы подключаем наш контейнер к состоянию с помощью функции `connect` и соединяем его `props` с содержимым глобального `state` с помощью функции `mapStateToProps`. Очень чисто и красиво.

Итак, мы научились распространять данные сверху вниз. Теперь нужно научиться изменять наш глобальный `state` снизу вверх. Для порождения событий о необходимости изменения глобального состояния предназначены `actions`. Давайте создадим `action`, возникающий при событии нажатия на кнопку.

Создадим файл `./actions/index.js`:

```javascript
import {
	SET_MODE
} from './actionTypes';

export const setMode = (mode) => ({type: SET_MODE, mode});
```

И файл `./actions/actionTypes`, в котором будем хранить константы с именами экшенов:

```javascript
export const SET_MODE = 'SET_MODE';
```

Экшен создаёт объект с именем события и набором данных, которые это событие сопровождают, и ничего больше. Теперь научимся порождать это событие. Возвращаемся в контейнер `<AppFooterContainer>` и подключаем функцию `mapDispatchToProps` которая подключит диспатчеры событий к `props` контейнера.

```javascript
import React from 'react';
import AppFooter from '../components/AppFooter.js';
import {connect} from 'react-redux';
import {setMode} from '../actions';

const mapStateToProps = (state) => ({
	mode: state.mode
});

const mapDispatchToProps = (dispatch) => ({
	setMode(mode) {
		dispatch(setMode(mode));
	}
});

const AppFooterContainer = ({mode, setMode}) => (
	<AppFooter mode={mode} setMode={setMode} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppFooterContainer);
```

Отлично у нас есть функция, порождающая событие `SET_MODE` и мы прокинули её до компонента `<AppFooter>`. Осталось две проблемы:

1. Эту функцию никто не вызывает
2. Никто не слушает событие

Разберёмся с первой проблемой. Идём в компонент `<AppFooter>` и подключаем вызов функции `setMode`.

```javascript
import React from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {MODES} from "../constants";

const AppFooter = ({mode = MODES.ARTICLES, setMode = () => {}}) => (
	<Footer>
		<FooterTab>
			<Button
				active={mode === MODES.ARTICLES}
				onPress={() => setMode(MODES.ARTICLES)}>
				<Text>Статьи</Text>
			</Button>
			<Button
				active={mode === MODES.PODCAST}
				onPress={() => setMode(MODES.PODCAST)}>
				<Text>Подкасты</Text>
			</Button>
		</FooterTab>
	</Footer>
);

export default AppFooter;
```

Теперь по нажатии на кнопку будет порождаться событие `SET_MODE`. Осталось научиться изменять глобальный `state` по его возникновению. Идём в ранее созданный `./reducers/index.js` и создаём редьюсер для этого события:

```javascript
import {
	SET_MODE
} from '../actions/actionTypes';

export default (state = [], action) => {
	switch (action.type) {
		case SET_MODE: {
			return Object.assign({}, state, {
				mode: action.mode
			});
		}
		default:
			return state
	}
};
```

Шикарно! Теперь клик по кнопке порождает событие, изменяющее глобальное состояние, а футер, получив эти изменения, перерисовывает кнопки.

![](https://cdn-images-1.medium.com/max/1000/1*h3uj82i-t8_vFWQvriVDWQ.png)
![](https://cdn-images-1.medium.com/max/1000/1*6bOJof3CNrhE9Skz5W_8pw.png)

## Подключаем PropTypes

Осталась одна небольшая деталь, которую хотелось бы сделать прежде, чем завершить этот урок. Давайте пропишем компоненте `<AppFooter>` типы её входящих параметров. Это упростит отладку в будущем и сделает наше приложение надёжнее.

```javascript
import React from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {MODES} from "../constants";
import PropTypes from 'prop-types';

const AppFooter = ({mode = MODES.ARTICLES, setMode = () => {}}) => (
	<Footer>
		<FooterTab>
			<Button
				active={mode === MODES.ARTICLES}
				onPress={() => setMode(MODES.ARTICLES)}>
				<Text>Статьи</Text>
			</Button>
			<Button
				active={mode === MODES.PODCAST}
				onPress={() => setMode(MODES.PODCAST)}>
				<Text>Подкасты</Text>
			</Button>
		</FooterTab>
	</Footer>
);

AppFooter.propTypes = {
	mode: PropTypes.string,
	setMode: PropTypes.func
};

export default AppFooter;
```

И аналогично для `<AppFooterContainer>`

```javascript
import React from 'react';
import AppFooter from '../components/AppFooter.js';
import {connect} from 'react-redux';
import {setMode} from '../actions';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
	mode: state.mode
});

const mapDispatchToProps = (dispatch) => ({
	setMode(mode) {
		console.log(mode);
		dispatch(setMode(mode));
	}
});

const AppFooterContainer = ({mode, setMode}) => (
	<AppFooter mode={mode} setMode={setMode}/>
);

AppFooterContainer.propTypes = {
	mode: PropTypes.string,
	setMode: PropTypes.func
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppFooterContainer);
```
---

Итак, мы научились подключать сторонние компоненты, разрабатывать свои собственные, а так же подключили Redux и разобрались с глобальным состоянием приложения. Более того, сами того не заметив мы отделили бизнес-логику от представления и данных. Наше будущее приложение уже неплохо структурировано и имеет хороший каркас. Весьма неплохо!

Все файлы к уроку доступны на [GitHub](https://github.com/devSchacht/react-native-app/tree/l2). Встретимся в следующей статье.

---

*Слушайте наш подкаст в [iTunes](https://itunes.apple.com/ru/podcast/девшахта/id1226773343) и [SoundCloud](https://soundcloud.com/devschacht), читайте нас на [Medium](https://medium.com/devschacht), контрибьютьте на [GitHub](https://github.com/devSchacht), общайтесь в [группе Telegram](https://t.me/devSchacht), следите в [Twitter](https://twitter.com/DevSchacht) и [канале Telegram](https://t.me/devSchachtChannel), рекомендуйте в [VK](https://vk.com/devschacht) и [Facebook](https://www.facebook.com/devSchacht).*

[Статья на Medium](https://medium.com/devschacht/create-devschacht-app-part-2-9fac76563392)
