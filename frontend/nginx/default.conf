 server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
                # Исправляем роутинг на фронтенде
        try_files $uri $uri/ /index.html;
    }
}