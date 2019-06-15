const {GraphQLObjectType,GraphQLSchema,GraphQLList,GraphQLInt,GraphQLString,GraphQLBoolean}=require('graphql');
const axios=require('axios');
//launch type
const LaunchType=new GraphQLObjectType({
    name:'launch',
    fields:()=>({
        flight_number:{ type:GraphQLInt},
        mission_name:{ type:GraphQLString},
        launch_year:{ type:GraphQLInt},
        launch_date_local:{ type:GraphQLString},
        launch_success:{ type:GraphQLBoolean},
        rocket:{ type:RocketType},
    })
});
const RocketType=new GraphQLObjectType({
    name:'Rocket',
    fields:()=>({
        rocket_id:{ type:GraphQLString},
        rocket_name:{ type:GraphQLString},
        rocket_type:{ type:GraphQLString},
        
    })
})
//root query
const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:({
        launches:{
            type:new GraphQLList(LaunchType),
            resolve(parent,args){
                return axios.get('http://api.spacexdata.com/v3/launches')
                .then(res => res.data);
            }
        }
    })
})
module.exports= new GraphQLSchema({
    query:RootQuery
})