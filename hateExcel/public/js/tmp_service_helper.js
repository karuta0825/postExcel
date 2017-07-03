
// idea1
var item  = cms.model.services.find({ 'version' : version, 'sales_id' : field })[0];

// 初回登録サービスでないならば
if ( item['is_first_time'] === 0 ) {
  field = item.service_id;
  map_result[table][field] = val.trim();
}
// 初回登録サービスならば
else {

  // バージョンごとに異なるから、これでは駄目

  // ネットワーク情報
  if ( item['tag'] === 'network' ) {
    uploadData['customers']['has_busiv']  = ( val === 1 ) ? 1 : 0;
    uploadData['customers']['has_fenics'] = ( val === 1 ) ? 0 : 1;
  }

  // スマデバ
  if ( item['tag'] === 'has_sd' ) {
    uploadData['customer']['has_mobile'] = val;
  }

  // 追加クライアント数 3項目
  if ( item['tag'] === 'client' ) {
    uploadData['client_number'] += val
  }

  // 追加ユーザー数 1項目
  if ( item['tag'] === 'user' ) {
    uploadData['user_number'] += val
  }

  // スマデバ数　1項目
  if ( item['tag'] === 'smart_device' ) {
    uploadData['sd_number'] += val
  }

}


// idea2

// ネットワーク情報
// customer__has_fenics:1
// customer__has_busiv:1

// モバイル情報
// customer__has_mobile:1

// 追加クライアント数
// client_number:1

// 追加ユーザー数
// user_number:1

// スマデバ数
// sd_number:1

