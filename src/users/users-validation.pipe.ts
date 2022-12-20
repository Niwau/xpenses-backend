import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { userSchema } from "./users.schema";

@Injectable()
export class UsersValidationPipe implements PipeTransform {

  async transform(value: any, metadata: ArgumentMetadata) {
   
    const { name, email, password } = value;
  
    try {
      await userSchema.validate({
        name: name,
        email: email,
        password: password
      })
    } catch (err) {
        throw new BadRequestException(err.errors)
    }
  
    return value
  
    }

}