import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  // ``  @IsNumber()
  //   @IsNotEmpty()
  //   rating: string;

  //   @IsBoolean()
  //   @IsNotEmpty()
  //   petFriendly: boolean;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsString()
  @IsNotEmpty()
  petFriendly: string;

  @IsString()
  @IsNotEmpty()
  menu: string[];
}
