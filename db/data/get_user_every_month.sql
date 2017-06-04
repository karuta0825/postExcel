
SELECT
	DATE_FORMAT(create_on, "%Y/%m") as month,
	count(kid) as number
FROM
    customer.kids
GROUP BY
    DATE_FORMAT(create_on, '%Y/%m');