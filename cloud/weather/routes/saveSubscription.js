module.exports = async (ctx, next) => {
  const { cid, list } = ctx._req.event;
  const SubscriptionList = ctx.db.collection('subscription_list');
  const res = await SubscriptionList.where({ openid: ctx.openid }).update({ data: { cid, list } });
  if(res.stats.updated === 0){
    const data = await SubscriptionList.add({ data: {openid: ctx.openid, cid, list} });
    if(data.errMsg === 'collection.add:ok'){
      ctx.body = { code: 1, message: '新增成功' }
    }else{
      ctx.body = { code: 0, message: `新增失败 ${data.errMsg}` }
    }
  }
  ctx.body = { code: 1, message: '更新成功' }
}