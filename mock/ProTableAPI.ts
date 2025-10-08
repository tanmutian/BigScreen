import dayjs from 'dayjs';
import { random } from 'lodash';

let data =new Array(60).fill(0).map((item,index) => {
  return{
    id: String(Math.random()),
    name: `刘德华${index}`,
    sex: String(random(0,1)),
    birthTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    age: random(0,100),
    member: new Array(2).fill(0).map((memberItem, memberIndex) => {
      return {
        id : String(Math.random()),
        memberName: `刘德华家人${memberIndex}`,
        memberSex: String(random(0,1)),
        memberBirthTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        memberAge: random(0,100),
      }
    })
  }
})

export default {
  'GET /api/v1/proTable/list': (req:any, res: any) => {
    const { current, pageSize, name, sex, dateStart, dateEnd, ageStart, ageEnd} = req.query;
    let newData = data.filter(item => {
      if(item.name.includes(name)){
        return true
      }else{
        return false
      }
    })
    console.log('111111111111111111111111111111111111111111111111',newData)
    const start = Number(current - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    res.json({
      data: newData.slice(start, end),
      total: newData.length,
      msg: '请求成功',
      code: 200,
      success: true,
    });
  },
};


