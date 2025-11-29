import dayjs from 'dayjs';
import { random, cloneDeep} from 'lodash';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

const sexAll = ['male','female']

let data =new Array(60).fill(0).map((item,index) => {
  return{
    id: String(Math.random()),
    name: `刘德华${index}`,
    sex: sexAll[random(0,1)],
    birthday: dayjs()
      .subtract(Math.floor(Math.random() * 365), 'day')
      .add(Math.floor(Math.random() * 86400), 'second')
      .format('YYYY-MM-DD HH:mm:ss'),
    age: random(0,100),
    member: new Array(2).fill(0).map((memberItem, memberIndex) => {
      return {
        id : String(Math.random()),
        memberName: `刘德华家人${memberIndex}`,
        memberSex: sexAll[random(0,1)],
        memberBirthTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        memberAge: random(0,100),
      }
    })
  }
})

export default {
  'GET /api/v1/proTable/list': (req:any, res: any) => {
    const { current, pageSize, name, sex, dateStart, dateEnd, ageStart, ageEnd} = req.query;
    let newData = cloneDeep(data)
    if(name){
      newData = newData.filter(item => {
        if(item.name.includes(name)){
          return true
        }else{
          return false
        }
      })
    }
    if(sex){
      newData = newData.filter(item => {
        if(item.sex === sex){
          return true
        }else{
          return false
        }
      })
    }
    if(dateStart){
      newData = newData.filter(item => {
        if(dayjs(item.birthday).isSameOrAfter(dayjs(dateStart))){
          return true
        }else{
          return false
        }
      })
    }
    if(dateEnd){
      newData = newData.filter(item => {
        if(dayjs(item.birthday).isSameOrBefore(dayjs(dateEnd))){
          return true
        }else{
          return false
        }
      })
    }
    if(ageStart){
      newData = newData.filter(item => {
        if(item.age >= ageStart){
          return true
        }else{
          return false
        }
      })
    }
    if(ageEnd){
      newData = newData.filter(item => {
        if(item.age <= ageEnd){
          return true
        }else{
          return false
        }
      })
    }

    const start = Number(current - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    res.json({
      data: newData.slice(start, end),      
      pagination: {
        total: newData.length,
        current: Number(current),
        pageSize: Number(pageSize),
      },
      msg: '请求成功',
      code: 200,
      success: true,
    });
  },
  'POST /api/v1/proTable/add': (req:any, res: any) => {
    //console.log(req.body)
    data.unshift({
      ...req.body,
      id: String(Math.random())
    })
    res.json({
      msg: '请求成功',
      code: 200,
      success: true,
    });
  },
  'POST /api/v1/proTable/delete': (req:any, res:any) => {
    let currentIndex = data.findIndex(item => item.id===req.body.id)
    data.splice(currentIndex,1)
    // let newData:any = []
    // for(let i=0;i<data.length;i++){
    //   if(data[i].id === req.body.id){
    //     continue
    //   }else{
    //     newData.push(data[i])
    //   }
    // }
    // data = newData
    res.json({
      msg:'请求成功',
      code:200,
      success: true,
    })
  },
  'POST /api/v1/proTable/edit': (req:any, res:any) => {
    let currentIndex = data.findIndex(item => item.id===req.body.id)
    // console.log("asdfasdf:"+{
    //   name: req.name,
    //   age: req.age,
    //   birthday: req.birthday,
    //   sex: req.sex,
    // })
    data[currentIndex] = {
      ...data[currentIndex],
      name: req.body.name,
      age: req.body.age,
      birthday: req.body.birthday,
      sex: req.body.sex,
    }
    res.json({
      msg:'请求成功',
      code:200,
      success: true,
    })
  },
  'GET /api/v1/proTable/getDetailById': (req:any, res: any) => {
    const {id} = req.query
    let thisData
    for(let i=0; i<data.length; i++){
      if(data[i].id === id){
        thisData = data[i]
        break
      }
    }
    res.json({
      data:thisData,
      msg:'请求成功',
      code:200,
      success: true,
    })
  }
};


