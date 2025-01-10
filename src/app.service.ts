import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Namaste Nepal!';
  }

 async getNepseData(){
    const res=await axios.get('https://chukul.com');
 
    // return datas;
    return res.data
  }
}
