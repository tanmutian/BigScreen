export default {
    'GET /api/v1/bigscreen/getUserCount': (req: any, res: any) => {
        res.json({
            userCount:51
        })
    },

    'POST /api/v1/bigscreen/getDeviceState': (req: any, res: any) => {
        if(req.body.type === 'year'){
            res.json({
                total:150,
                data:[
                {
                    key:1,
                    status_name: "点检",
                    complete: 30,
                    wait_complete: 4,
                    total: 34,
                },
                {
                    key:2,
                    status_name: "保养",
                    complete: 38,
                    wait_complete: 10,
                    total: 48,
                },
                {
                    key:3,
                    status_name: "维修",
                    complete: 48,
                    wait_complete: 4,
                    total: 52,
                }
                ]
            })
        }else if(req.body.type === 'month'){
            res.json({
                total:150,
                data:[
                {
                    key:1,
                    status_name: "点检",
                    complete: 17,
                    wait_complete: 5,
                    total: 22,
                },
                {
                    key:2,
                    status_name: "保养",
                    complete: 8,
                    wait_complete: 5,
                    total: 13,
                },
                {
                    key:3,
                    status_name: "维修",
                    complete: 12,
                    wait_complete: 2,
                    total: 14,
                }
                ]
            })
        }else if(req.body.type === 'day'){
            res.json({
                total:150,
                data:[
                {
                    key:1,
                    status_name: "点检",
                    complete: 3,
                    wait_complete: 5,
                    total: 8,
                },
                {
                    key:2,
                    status_name: "保养",
                    complete: 4,
                    wait_complete: 1,
                    total: 5,
                },
                {
                    key:3,
                    status_name: "维修",
                    complete: 7,
                    wait_complete: 0,
                    total: 7,
                }
                ]
            })
        }
    },

    'POST /api/v1/bigscreen/getRevenue': (req: any, res: any) => {
        if(req.body.time === 'day'){
            res.json({revenue:8,refund:5})
        }else if(req.body.time === 'month'){
            res.json({revenue:120,refund:80})
        }else if(req.body.time === 'year'){
            res.json({revenue:800,refund:680})
        }
    },

    'POST /api/v1/bigscreen/getCapacity': (req: any, res: any) => {
        if(req.body.time === 'day'){
            res.json({dataArray:[100,200,300,400]})
        }else if(req.body.time === 'month'){
            res.json({dataArray:[300,500,700,900]})
        }else if(req.body.time === 'year'){
            res.json({dataArray:[1000,1500,2000,2500]})
        }
    },

    'POST /api/v1/bigscreen/getPlan': (req: any, res: any) => {
        if(req.body.time === 'day'){
            res.json({
                plan_value:12,
                achieved_value:15,
                x:['2025-07-01','2025-07-02','2025-07-03','2025-07-04','2025-07-05','2025-07-06','2025-07-07'],
                data1:[1,7,5,8,9,4,5],
            })
        }else if(req.body.time === 'month'){
            res.json({
                plan_value:122,
                achieved_value:155,
                x:['01','02','03','04','05','06'],
                data1:[15,85,45,68,92,150],
            })
        }else if(req.body.time === 'year'){
            res.json({
                plan_value:1222,
                achieved_value:1555,
                x:['2019','2020','2021','2022','2023','2024','2025'],
                data1:[120,150,167,121,142,180,158],
            })
        }
    },
}