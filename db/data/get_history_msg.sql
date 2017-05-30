SELECT
    type,
    content_name,
    item_name,
    `before`,
    `after`,
    CASE
        WHEN
            type = '更新'
        THEN
            CASE
                WHEN `before` = '' or `before` is null THEN CONCAT(`after`, 'に設定されました')
                ELSE CONCAT(`before`, 'から', `after`, 'に更新されました')
            END
        WHEN type = '削除' 
			THEN CONCAT(`item_name`, 'が削除されました')
        WHEN type = '追加' 
			then  concat(item_name, 'が追加されました')
        ELSE NULL
    END AS msg,
    DATE_FORMAT(create_on, '%Y-%m-%d %H:%i:%s') AS create_on,
	L.name AS creater
FROM
    HISTORYS H
        LEFT JOIN
    login_users L ON H.create_user_id = L.id
WHERE
    kid = ''
ORDER BY create_on DESC;