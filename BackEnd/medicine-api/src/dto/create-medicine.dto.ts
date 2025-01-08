import { IsNumber, IsString } from 'class-validator';

export class CreateMedicineDTO {
  // 사용자 식별자
  @IsNumber()
  uid: number;

  // 품목기준코드 PK
  @IsNumber()
  itemSeq: number;

  // 약 이름
  @IsString()
  itemName: String;

  // 약 이미지
  @IsString()
  itemImage: String;

  // 업체명
  @IsString()
  entpName: String;

  // 효능
  @IsString()
  efcyQesitm: String;

  // 사용법
  @IsString()
  useMethodQesitm: String;

  // 주의사항
  @IsString()
  atpnQesitm: String;

  // 부작용
  @IsString()
  seQesitm: String;

  // 보관법
  @IsString()
  depositMethodQesitm: String;
}
