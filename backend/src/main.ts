import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const PORT = process.env.PORT;

	const app = await NestFactory.create(AppModule);

	// swagger documentation
	const swaggerOptions = new DocumentBuilder()
		.addBearerAuth()
		.setTitle('Calories App')
		.setDescription('Calories App API Documentation')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, swaggerOptions);

	SwaggerModule.setup('api-docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true
		}
	});


	await app.listen(PORT);
}

bootstrap();