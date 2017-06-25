use customer;
select 
 month,
 sum(user) as user,
 sum(client) as client,
 sum(pc) as pc
from ( 
SELECT
	month,
    CASE item_name
        WHEN 'ユーザー作成' THEN new_user_number
        ELSE NULL
    END AS `user`,
    CASE item_name
        WHEN 'クライアント数' THEN new_user_number
        ELSE NULL
    END AS `client`,
    CASE item_name
        WHEN '端末台数' THEN new_user_number
        ELSE NULL
    END AS `pc`
FROM
    ((SELECT 
        'ユーザー作成' AS item_name,
            COUNT(kid) AS new_user_number,
            DATE_FORMAT(create_on, '%Y/%m') AS month
    FROM
        kids
    GROUP BY DATE_FORMAT(create_on, '%Y/%m')) UNION ALL (SELECT 
        item_name,
            SUM(diff),
            DATE_FORMAT(create_on, '%Y/%m') AS month
    FROM
        (SELECT 
        item_name, `after` - `before` AS diff, create_on
    FROM
        historys
    WHERE
        item_name = 'クライアント数'
            OR item_name = '端末台数') AS T
    GROUP BY DATE_FORMAT(T.create_on, '%Y/%m') , T.item_name)) AS tmp
    ) as a group by month
    
    
    
# part2 
# - [X] lm esでわける必要がある 
# - [ ] diffの値を + or - で分ける必要あり
#   - [X] +のときは対応-も一緒に表示させるかどうかで迷ってる。
select 
	DATE_FORMAT(create_on, '%Y/%m') as month,
    ifnull(sum(case item_name when 'ユーザー作成' THEN val else null end ),0) as user,
    ifnull(sum(case item_name when 'クライアント数' THEN val else null end ),0) as client,
    ifnull(sum(case item_name when '端末台数' THEN val else null end ),0) as pc,
    version
from ((
    SELECT 
        'ユーザー作成' AS item_name,
		1 as val,
        create_on,
        E.version
    FROM
        kids K 
	left join environments E
    on K.environment_id	 = E.id
	) UNION ALL (
	SELECT 
		item_name,
		`after` - `before` AS diff,
		H.create_on,
		E.version
	FROM
		historys H
			LEFT JOIN
		kids K ON H.kid = K.kid
			LEFT JOIN
		environments E ON K.environment_id = E.id
	WHERE
		item_name = 'クライアント数'
			OR item_name = '端末台数'
            and `after` - `before` > 0
	)) AS T
    GROUP BY DATE_FORMAT(create_on, '%Y/%m'), version;