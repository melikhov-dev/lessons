import * as React from 'react';
import {ArticleListResponse} from '../common/ArticleListResponse';
import { useParams } from 'react-router-dom';
import * as ReactMarkdowm from 'react-markdown';

export const Article = () => {
	const {name} = useParams();
	const [article, setArticle] = React.useState<string>('');
	React.useEffect(() => {
		fetch(`/api/article/${name}`)
			.then((response) => response.text())
			.then((article) => setArticle(article));
	}, [])

	return (
		<div>
			<ReactMarkdowm source={article} />
		</div>
	)
}
