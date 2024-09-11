import redis from '@/app/lib/redis';
import { NextResponse } from 'next/server';

export async function GET(req,{ params }) {
    try {
        const id  = params.id;
        const userData = await redis.hgetall(`aman:${id}`);
        if (!userData.id) {
          return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
          return NextResponse.json(userData);
    } catch (error) {
        return NextResponse.json(error,{message:"error occured"},{status:500})
    }
  }

  export async function PUT(req,{params}) {
    try {
      const id = params.id;
      const {name,age,mobno } = await req.json();
      await redis.hmset(`aman:${id}`,{id,name,age,mobno});
      return NextResponse.json({ message: 'User update successfully' });
    } catch (error) {
        return NextResponse.json(error,{message:'error occured'},{status:500});
    }
  }

export async function DELETE(req,{params}){
  try {
      const id  = params.id;
      const userExists = await redis.exists(`aman:${id}`);
      if (!userExists) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      await redis.del(`aman:${id}`);
      return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json(error,{message:'error occured'},{status:500});
    }
  }