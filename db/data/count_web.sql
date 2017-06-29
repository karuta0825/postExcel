use customer;
SELECT 
    case when version = 'ES' then 
		(select name from servers where type = 'WEB' and version = 'ES')
    else 
		(select name from servers where type = 'WEB' and version = 'LM')
    end as web_server,
    SUM(number_mobile) as number_mobile,
    200 -  SUM(number_mobile) as available_number,
    version
FROM
    kids K
        LEFT JOIN
    (SELECT 
        kid, COUNT(is_mobile) AS number_mobile
    FROM
        customer.fenics
    WHERE
        is_mobile = 1
    GROUP BY kid) M ON K.kid = M.kid
        LEFT JOIN
    servers S ON K.server = S.name
GROUP BY S.version;
