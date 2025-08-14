#!/bin/sh
# Garante que o script pare se um comando falhar
set -e

# Este script agora roda como root
echo "Entrypoint: Running as root. Fixing permissions..."

# Dá ao usuário 'editaliza' permissão para escrever no diretório /app
# para que o banco de dados db.sqlite possa ser criado.
chown editaliza:nodejs /app
chown -R editaliza:nodejs /app/data /app/logs

echo "Entrypoint: Permissions fixed."

# Agora, executa o comando principal (CMD) do Dockerfile, mas
# trocando do usuário root para o usuário 'editaliza'.
echo "Entrypoint: Switching to user 'editaliza' to run the application..."
exec su-exec editaliza "$@"
