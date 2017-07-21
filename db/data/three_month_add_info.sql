use customer;
select D.month, ifnull(user,0) as user, ifnull(client,0) as client, ifnull(pc,0) as pc, D.version from (
SELECT 
    DATE_FORMAT(create_on, '%Y/%m') AS month,
    IFNULL(SUM(CASE item_name
                WHEN 'ユーザー作成' THEN val
                ELSE NULL
            END),
            0) AS user,
    IFNULL(SUM(CASE item_name
                WHEN 'クライアント数' THEN val
                ELSE NULL
            END),
            0) AS client,
    IFNULL(SUM(CASE item_name
                WHEN '端末台数' THEN val
                ELSE NULL
            END),
            0) AS pc,
    version
FROM
    (
		(
        SELECT 
			'ユーザー作成' AS item_name,
				1 AS val,
				register_on as create_on,
				E.version
		FROM
			kids K
		LEFT JOIN environments E ON K.environment_id = E.id
        )
		UNION ALL
		(
		SELECT 
			item_name,
				`after` - `before` AS diff,
				H.create_on,
				E.version
		FROM
			historys H
		LEFT JOIN kids K ON H.kid = K.kid
		LEFT JOIN environments E ON K.environment_id = E.id
		WHERE
			(item_name = 'クライアント数' OR item_name = '端末台数')
			AND ( `after` - `before` > 0 )
		)
	) AS T
GROUP BY DATE_FORMAT(create_on, '%Y/%m') ,version
) TMP 
right join 
(
	select '2017/03'as month, 'ES' as version
    union all
    select '2017/03', 'LM'
    union all
    select '2017/04', 'ES'
    union all
    select '2017/04', 'LM'
    union all
    select '2017/05', 'ES'
	union all
    select '2017/05', 'LM'
) D
on TMP.month = D.month and TMP.version = D.version
