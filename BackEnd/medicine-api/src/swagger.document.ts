import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Drpill Swagger')
      .setDescription('DrPill API Description')
      .setVersion('1.0.0')
      .addTag('swagger')
      .build();
  }
}
