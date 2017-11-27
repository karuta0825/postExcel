
-- APのみ
SELECT 
    S.name,
    IFNULL(client_number, 0) AS client_number,
    capacity - IFNULL(client_number, 0) AS available_number,
    version
FROM
    servers S
        LEFT JOIN
    (SELECT 
        server, SUM(client_number) AS client_number
    FROM
        kids K
    LEFT JOIN (SELECT 
        kids_id, COUNT(kids_id) AS client_number
    FROM
        clients C
    WHERE
        is_admin = 0 AND end_on IS NULL
    GROUP BY kids_id) SUM_CLI ON K.id = SUM_CLI.kids_id
    GROUP BY server) SRVS ON S.name = SRVS.server
WHERE
    type = 'AP'
union all 
-- DBのみ
SELECT 
    S.name, 
    IFNULL(client_number, 0) AS client_number,
    S.capacity - IFNULL(client_number, 0) as available_number,
    version
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
union all
SELECT 
    name,
    client_number, 
    S.capacity - client_number as available_number,
    S.version
FROM
    (SELECT 
        version, SUM(client_number) AS client_number
    FROM
        (SELECT 
        S.name, IFNULL(client_number, 0) AS client_number, version
    FROM
        servers S
    LEFT JOIN (SELECT 
        server, SUM(client_number) AS client_number
    FROM
        kids K
    LEFT JOIN (SELECT 
        kids_id, COUNT(kids_id) AS client_number
    FROM
        clients C
    WHERE
        is_admin = 0 AND end_on IS NULL
    GROUP BY kids_id) SUM_CLI ON K.id = SUM_CLI.kids_id
    GROUP BY server) SUM_SRVS_AP ON SUM_SRVS_AP.server = S.name
    WHERE
        type = 'AP') SUM_WEB
    GROUP BY version) ADD_NAME
        LEFT JOIN
    servers S ON ADD_NAME.version = S.version
WHERE
    type = 'WEB'
order by name

