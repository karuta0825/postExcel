SELECT 
    U.id,
    CONCAT('KID', U.kid) AS kid,
    U.user_name AS user_name,
    U.kana,
    U.server,
    U.userkey,
    U.db_password,
    U.fenics_key,
    U.number_pc,
    IFNULL(CLT.client_number, 0) AS client_number,
    REPLACE(LIC.services, ':', '') AS license,
    U.number_id,
    CONCAT(start_id, '-', U.start_id + U.number_id) range_id,
    L.name AS creater,
    IFNULL(UPD.update_on,
            DATE_FORMAT(U.create_on, '%Y/%m/%d')) AS update_on,
    ENV.system_type,
    ENV.version,
    C_group.has_busiv,
    C_group.has_fenics,
    C_group.has_mobile,
    IFNULL(SM.mobile_number, 0) AS mobile_number,
    IFNULL(MO.is_marked,0) as is_marked,
    U.is_registered,
    DATE_FORMAT(U.register_on, '%Y/%m/%d') AS register_on,
    sa_company,
    sa_name,
    sa_tel,
    sa_email,
    se_company,
    se_name,
    se_tel,
    se_email,
    em_company,
    em_name,
    em_tel,
    em_email
FROM
    kids AS U
        LEFT JOIN
    login_users AS L ON U.create_user_id = L.id
        LEFT JOIN
    environments AS ENV ON U.environment_id = ENV.id
        LEFT JOIN
    (SELECT 
        kids_id,
            CASE
                WHEN SUM(has_busiv) > 0 THEN 1
                ELSE 0
            END AS has_busiv,
            CASE
                WHEN SUM(has_fenics) > 0 THEN 1
                ELSE 0
            END AS has_fenics,
            CASE
                WHEN SUM(has_mobile) > 0 THEN 1
                ELSE 0
            END AS has_mobile
    FROM
        customers
    GROUP BY kids_id) C_group ON U.id = C_group.kids_id
        LEFT JOIN
    (SELECT 
        kids_id, COUNT(kids_id) AS client_number
    FROM
        clients
    WHERE
        is_admin = 0
    GROUP BY kids_id) CLT ON U.id = CLT.kids_id
        LEFT JOIN
    (SELECT 
        kids_id,
            MAX(DATE_FORMAT(create_on, '%Y/%m/%d')) AS update_on
    FROM
        historys H
    GROUP BY kids_id) UPD ON UPD.kids_id = U.id
        LEFT JOIN
    licenses LIC ON LIC.kids_id = U.id
        LEFT JOIN
    partners P ON U.id = P.kids_id
        LEFT JOIN
    (SELECT 
        kids_id, COUNT(kids_id) AS mobile_number
    FROM
        fenics
    WHERE
        is_mobile = 1
    GROUP BY kids_id) SM ON U.id = SM.kids_id
		LEFT JOIN
	( SELECT distinct kids_id, '1' as is_marked FROM memos where priority_id = '2' ) MO ON U.id = MO.kids_id
ORDER BY kid DESC;
