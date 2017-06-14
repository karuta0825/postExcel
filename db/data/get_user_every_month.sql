use customer;
(
SELECT
	'ユーザー作成' as item_name,
	count(kid) as new_user_number,
    DATE_FORMAT(create_on, "%Y/%m") as month
FROM
    kids
GROUP BY
    DATE_FORMAT(create_on, '%Y/%m')
)
union all
(
select 
 item_name,
 sum(diff),
 DATE_FORMAT(create_on, "%Y/%m") as month
from (
SELECT
	item_name,
	`after` - `before` as diff,
    create_on
FROM historys
where item_name = 'クライアント数' or item_name = '端末台数'
) T
GROUP BY
    DATE_FORMAT(T.create_on, '%Y/%m'), T.item_name
)
order by month;