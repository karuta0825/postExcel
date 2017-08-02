use customer;
SELECT 
    M.kid,
    M.base_id,
    M.fenics_key,
    IFNULL(S.client_number, 0) AS client_number,
    M.admin_id,
    M.admin_pw,
    M.city_cd,
    M.office_cd
FROM
    mobiles M
        LEFT JOIN
    (SELECT 
        kid, COUNT(kid) AS client_number
    FROM
        fenics
    WHERE
        is_mobile = 1
    GROUP BY kid) S ON M.kid = S.kid
WHERE
    M.kid = 'KID98371';