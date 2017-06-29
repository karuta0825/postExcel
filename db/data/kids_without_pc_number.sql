use customer;
explain
SELECT 
    U.id,
    U.kid,
    U.user_name AS user_name,
    U.server,
    U.userkey,
    U.db_password,
    U.fenics_key,
    FEN.number_pc,
	CLT.client_number,
    U.number_id,
    U.start_id,
    L.name AS creater,
    IFNULL( UPD.update_on, DATE_FORMAT(U.create_on, '%Y/%m/%d')) AS update_on,
    ENV.system_type,
    ENV.version,
    C_group.has_busiv,
    C_group.has_fenics,
    C_group.has_mobile,
    U.is_registered,
    U.register_on
FROM
    kids AS U
        LEFT JOIN
    login_users AS L ON U.create_user_id = L.id
        LEFT JOIN
    customers AS cus ON U.kid = cus.kid
        LEFT JOIN
    environments AS ENV ON U.environment_id = ENV.id
		left join
	(select 
		kid,
		case when sum(has_busiv) > 0 then 1 else 0 end as has_busiv,
		case when sum(has_fenics) > 0 then 1 else 0 end as has_fenics,
        case when sum(has_mobile) > 0 then 1 else 0 end as has_mobile
	from customer.customers
	group by kid
    ) C_group on U.kid = C_group.kid
		left join
	( select kid, count(kid) as number_pc from fenics where is_mobile = 0 group by kid) FEN on U.kid =FEN.kid
		left join
	(SELECT 
			kid,
            COUNT(kid) as client_number
        FROM
            clients
        WHERE
            is_admin = 0 group by kid) CLT on U.kid =CLT.kid
		left join
	(SELECT 
			kid,
			max(DATE_FORMAT(create_on, '%Y/%m/%d')) as update_on
	 FROM
			historys H
	 group by kid
	) UPD on UPD.kid = U.kid;
            
