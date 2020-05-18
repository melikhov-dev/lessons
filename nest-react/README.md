Пример приложения nest + react.
Видео: https://youtu.be/Cy-UbbMVd-g

Запуск Docker
```shell script
docker build -t 1.0.0 . && docker run -p 80:80 -p 443:443 -v `pwd`:/www/ --name nginx-nest-react 1.0.0
```
