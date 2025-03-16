<script type="text/javascript">
function uGC(n,e,i){if(!n||""==n||!e||""==e||!i||""==i)return"-";var r,f,t,u="-";return r=n.indexOf(e),t=e.indexOf("=")+1,r>-1&&((f=n.indexOf(i,r))<0&&(f=n.length),u=n.substring(r+t,f)),u}

var z = uGC(document.cookie, '__utmz=', ';');
var source = uGC(z, 'utmcsr=', '|');
var medium  = uGC(z, 'utmcmd=', '|');
var term    = uGC(z, 'utmctr=', '|');
var content = uGC(z, 'utmcct=', '|')
var campaign = uGC(z, 'utmccn=', '|');
var gaClientId = ''; try{gaClientId = ga.getAll()[0].get('clientId');}catch(e){}
var session_number = (typeof z.split('.')[2] !== 'undefined') ? z.split('.')[2] : '';
  var pages_in_session = (typeof uGC(document.cookie, '__utmb=', ';').split('.')[1] !== 'undefined') ? uGC(document.cookie, '__utmb=', ';').split('.')[1] : ''
  
  if (session_number==''){session_number=='1'}
   if (pages_in_session==''){pages_in_session=='1'}
  else {pages_in_session = parseInt(pages_in_session)+1}
  console.log('dd_pc='+pages_in_session)
  console.log('dd_sc='+session_number)
  
  dataLayer.push({
  'df_source':source,
  'df_medium':medium,
  'df_term':term,
  'df_content':content,  
  'df_campaign':campaign,
    'df_session_number':session_number,
    'df_pages_in_session':pages_in_session,
  })
</script>
