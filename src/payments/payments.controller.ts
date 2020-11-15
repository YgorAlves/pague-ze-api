import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/models/user.entity';
import { PaymentsService } from './payments.service';
import {DepositWalletDto} from './dto/DepositWallet.dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PayContactDto } from './dto/PayContact.dto';
const { Bancos, Boletos, streamToPromise } = require('gerar-boletos');

const boleto = {
  banco: new Bancos.BancoBrasil(),
  pagador: {
    nome: 'José Bonifácio de Andrada',
    registroNacional: '12345678',
    endereco: {
      logradouro: 'Rua Pedro Lessa, 15',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estadoUF: 'RJ',
      cep: '20030-030'
    }
  },
  instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
  beneficiario: {
    nome: 'Empresa Fictícia LTDA',
    cnpj:'43576788000191',
    dadosBancarios: {
      carteira: '09',
      agencia: '18455',
      agenciaDigito: '4',
      conta: '1277165',
      contaDigito: '1',
      nossoNumero: '00000000061',
      nossoNumeroDigito: '8'
    },
    endereco: {
      logradouro: 'Rua Pedro Lessa, 15',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estadoUF: 'RJ',
      cep: '20030-030'
    }
  },
  boleto: {
    numeroDocumento: '1001',
    especieDocumento: 'DM',
    valor: 110.00,
    datas: {
      vencimento: '02-04-2020',
      processamento: '02-04-2019',
      documentos: '02-04-2019'
    }
  }
};



@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) { }

  randomInt(min, max) {
    return  Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min) )
  }

  @UseGuards(JwtAuthGuard)
  @Post('loterica')
  async generateLotericaCode(@Body() depositWalletDto: DepositWalletDto, @CurrentUser() user: User): Promise<any> {
    const code = [this.randomInt(100,999),' ',this.randomInt(100,999),' ', this.randomInt(10, 99)].join()
    
    await this.paymentsService.depositWallet(depositWalletDto, user)

    return { identity: user.identity, code: code.replace(/,/g, '') }
  }

  @UseGuards(JwtAuthGuard)
  @Post('boleto')
  async generateBoleto(@Body() depositWalletDto: DepositWalletDto, @CurrentUser() user: User): Promise<any> {
    const code = [this.randomInt(100,999),' ',this.randomInt(100,999),' ', this.randomInt(10, 99)].join()
    
    const novoBoleto = new Boletos(boleto);
    novoBoleto.gerarBoleto();
    
    // console.log(novoBoleto)
    // console.log(novoBoleto.getNumeroDoDocumentoFormatado())
    
    novoBoleto.pdfFile().then(async (stream) => {
      // console.log(stream)
      // ctx.res.set('Content-type', 'application/pdf');	
      await streamToPromise(stream);
    }).catch((error) => {
      return error;
    });

    await this.paymentsService.depositWallet(depositWalletDto, user)

    return { identity: user.identity, code: '34191.79001 01043.510047 91020.150008 5 84390026000' }
  }


  @UseGuards(JwtAuthGuard)
  @Post('contact')
  async payContact(@Body() payContactDto: PayContactDto, @CurrentUser() user: User): Promise<any> {
    return await this.paymentsService.payContact(payContactDto, user);
  }



  // @Post('deposit')
  // async depositWallet(@Body() depositWalletDto: DepositWalletDto, @CurrentUser() user: User): Promise<any> {

  //   return await this.paymentsService.depositWallet(depositWalletDto,user);
  // }
  
}
