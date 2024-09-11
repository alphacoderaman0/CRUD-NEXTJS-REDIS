import redis from '@/app/lib/redis';
import { NextResponse } from 'next/server';

export async function POST(req){
  try {
    const {name,age,mobno } = await req.json();
    if(!name && !age && !mobno){
      return NextResponse.json({message:"all fields are required"},{status:404});
    }
    else if(!name){
      return NextResponse.json({message:"Name is required"},{status:404});
    }
    else if(name.length<=2){
      return NextResponse.json({message:"Name must be of two or more Character"},{status:404});
    }
    else if(name == parseInt(name)){
      return NextResponse.json({message:"Name must be Alphabet , not number"},{status:404});
    }
    else if(!age){
      return NextResponse.json({message:"Age is required"},{status:404});
    }
    else if(age <= 17){
      return NextResponse.json({message:"Age must be less than or equal to 18"},{status:404});
    }
    else if(age != parseInt(age)){
      return NextResponse.json({ message: 'Age should be Number ALphabet not Allowed'},{status:404});
    }
    else if(!mobno){
      return NextResponse.json({message:"Mobile No. is required"},{status:404},{status:404});
    }
    else if(mobno.length != 10){
      return NextResponse.json({ message: 'Mobile number should be of 10 degits'},{status:404});
    }
    else if(mobno != parseInt(mobno)){
      return NextResponse.json({ message: 'Mobile Number should be Number ALphabet not Allowed'},{status:404});
    }
    else{
        const id = await redis.incr('id')
        await redis.hmset(`aman:${id}`, {id,name,age,mobno});
        return NextResponse.json({ message: 'User created successfully'}); 
    }
  } catch (error) {
    return NextResponse.json({message:"Error occured"},{status:500})
  }
}

export async function GET() {
  try {
    const keys = await redis.keys('aman:*');
  // here I Use pipeline to fetch all hash data
    const pipeline = redis.pipeline();
    keys.forEach((key) => {
      pipeline.hgetall(key);
    });
  
  // here I Execute the pipeline and get the result
    const result = await pipeline.exec();
  
  // here I Format the result to a user-friendly format
    const users = result.map(([err, userData], index) => {
      if (err) throw err;
      return { key: keys[index], ...userData };
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(error,{message:'error occured'},{status:500});
  }
}
