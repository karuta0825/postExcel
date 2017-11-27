
-- DBのみ
SELECT 
    S.name, 
    IFNULL(client_number, 0) AS client_number,
    S.capacity - IFNULL(client_number, 0) as available_number
FROM
    servers S
RIGHT JOIN
    (
		-- 各APサーバーの接続先のDBごとのクライアント数をもとめる
		SELECT 
			connect_db AS name,
			SUM(IFNULL(client_number, 0)) AS client_number
		FROM
			servers S
		LEFT JOIN 
        -- APサーバごとの接続クライアント数をもとめる
		(
			SELECT 
				server, SUM(client_number) AS client_number
			FROM
				kids K
			LEFT JOIN 
			(
				SELECT 
					kids_id, COUNT(kids_id) AS client_number
				FROM
					clients C
				WHERE
					is_admin = 0 AND end_on IS NULL
				GROUP BY kids_id
			) SUM_CLI 
			ON K.id = SUM_CLI.kids_id
			GROUP BY server
		) SRVS ON S.name = SRVS.server where server is not null
		GROUP BY connect_db 
    ) SUM_DB_SRVS
ON S.name = SUM_DB_SRVS.name
