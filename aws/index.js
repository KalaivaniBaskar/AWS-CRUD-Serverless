// Lambda function : usersAPI
const AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-1'
})
const dynamoDBTableName = 'UsersData';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const userPath = '/users';

exports.handler = async (event, context, callback) => {
 let response;
 console.log("Event",event)
 console.log("Event body", event.body)
 console.log("Event method", event.httpMethod)
 switch (event.httpMethod) {
   case 'POST':
     console.log("in post method:")
     response = await saveUser(JSON.parse(event.body));
     break;
     
     case 'GET':
       console.log("in get method:")
       response = await getUsers();
       break;
     
     case 'PUT':
       console.log("in put method")
       const requestBody = JSON.parse(event.body);
       response = await updateUser(requestBody.id, requestBody.updateKey, requestBody.updateValue);
       console.log("put response", response)
       break;
     
     case 'DELETE':
        console.log('in delete method')
        response = await deleteUser(JSON.parse(event.body).id)
        break;
     
     default:
     response = buildResponse(404, '404 Not found');
     break;
 }
 return response;
};

// delete user from DB 
async function deleteUser(id){
  const params = {
    TableName : dynamoDBTableName,
    Key: { 'id' : id },
    returnValues : 'ALL_OLD'
  }
  try{
     const data = await dynamodb.delete(params).promise()
     const body = {
          Operation : 'DELETE',
          Message: 'SUCCESS',
          Item: data
        }
      return {
          "statusCode": 200,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(body)
        }
  }
  catch(error){
    return {
          "isBase64Encoded": false,
          "statusCode": 500,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(error)
        }
  }
}

//update an user data in DB 
async function updateUser(id, updateKey, updateValue){
  const params = {
    TableName: dynamoDBTableName,
    Key : { 'id' : id },
    UpdateExpression: `set ${updateKey} = :value` ,
    // refer syntax for multiple fields change "SET ProductCategory = :c, Price = :p" 
    ExpressionAttributeValues: {
      ':value' : updateValue
    },
    returnValues: 'UPDATED_NEW'
  }
  
  try{
      const data = await dynamodb.update(params).promise()
      console.log("data put", data)
      const body = {
          Operation : 'UPDATE',
          Message: 'SUCCESS',
          Item: id
        }
      return {
          "statusCode": 200,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(body)
        }
  }
  catch(error){
     return {
          "isBase64Encoded": false,
          "statusCode": 500,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(error)
        }
    }
  
}

//fetch users from DB
async function getUsers(){
  const params = {
    TableName: dynamoDBTableName
  }
  try {
        const data = await dynamodb.scan(params).promise()
        return {
          "statusCode": 200,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(data)
        }
    }
    catch(error){
      return {
          "isBase64Encoded": false,
          "statusCode": 500,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(error)
        }
    }
}

// post data to DB
async function saveUser(requestBody){
  console.log("item to add", requestBody)
  const params = {
    TableName: dynamoDBTableName,
    Item: requestBody
  }
  try{
    const data = await dynamodb.put(params).promise()
    const body = {
      Operation : 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody,
      Data: data
    }
    return  {
          "isBase64Encoded": false,
          "statusCode": 200,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(body)
        }
  }
  catch(error){
    return {
          "isBase64Encoded": false,
          "statusCode": 500,
          "headers" : {
            'Content-Type' : 'application/json',
            "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          "body": JSON.stringify(error)
        }
  }
  
}
function buildResponse(statusCode, body){
  return {
    "isBase64Encoded": false,
    "statusCode": statusCode,
    "headers" : {
      'Content-Type' : 'application/json',
      "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
    },
    "body": JSON.stringify(body)
  }
}