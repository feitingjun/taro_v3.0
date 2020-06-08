module.exports = async (ctx, next) => {
  const { cid, district, list } = ctx._req.event;
  const SubscriptionList = ctx.db.collection('subscription_list');
  const res = await SubscriptionList.where({ openid: ctx.openid }).get();
  if(res.data.length === 0){
    const data = await SubscriptionList.add({ data: {openid: ctx.openid, cid, district, list} });
    if(data.errMsg === 'collection.add:ok'){
      ctx.body = { code: 1, message: '新增成功' }
    }else{
      ctx.body = { code: 0, message: `新增失败 ${data.errMsg}` }
    }
  }else{
    const data = await SubscriptionList.doc(res.data[0]._id).update({ data: { cid, district, list } });
    if(data.errMsg === 'document.update:ok'){
      ctx.body = { code: 1, message: '更新成功' }
    }else{
      ctx.body = { code: 0, message: '更新失败' }
    }
  }
}