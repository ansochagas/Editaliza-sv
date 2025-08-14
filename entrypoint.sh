#!/bin/sh

# Garante que o script pare se um comando falhar
set -e

# Ajusta a propriedade das pastas de dados e logs para o usuário da aplicação.
# Isso corrige problemas de permissão com volumes montados pelo Docker.
echo "Updating permissions for /app/data and /app/logs..."
chown -R editaliza:nodejs /app/data /app/logs
echo "Permissions updated."

# Executa o comando principal do contêiner (o CMD do Dockerfile).
# O 'exec "$@"' passa o controle do processo para o comando seguinte,
# permitindo que ele receba sinais do sistema (como o de parada).
echo "Starting application..."
exec "$@"
