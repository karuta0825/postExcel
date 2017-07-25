use customer;
SELECT M.kid, base_id, fenics_key, ifnull(F.client_number,0) as client_number, admin_id, admin_pw FROM mobiles M
left join ( select kid, count(kid) as client_number from fenics where is_mobile = 1 group by kid ) F
on M.kid = F.kid;