FROM python:3.9

WORKDIR /app
RUN apt-get update && apt-get install -y netcat-openbsd
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

ENTRYPOINT ["sh","/usr/local/bin/entrypoint.sh"]
