import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Vagas } from 'src/app/interfaces/vagas';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
//import { VagasService } from 'src/app/services/vagas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.page.html',
  styleUrls: ['./vagas.page.scss'],
})
export class VagasPage implements OnInit {
  
  private loading: any;
  private vagasSubscription: Subscription;
  private vagaId: string = null;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
             // private vagaService: VagasService,
              
  ) { 
    this.vagaId = this.activatedRoute.snapshot.params['id'];

   // if (this.vagaId) this.loadVaga();
  }

  ngOnInit() {
  }
  ShowPage(){
    this.navCtrl.navigateBack("telainicial")
  }

 // loadVaga() {
 //   this.vagasSubscription = this.vagaService.getVaga(this.vagaId).subscribe(data => {
  //    this.vaga = data;
  //  })
 // }

  async saveVaga() {
    await this.presentLoading();

   // this.vaga.userId = (await this.authService.getAuth().currentUser).uid;

    if (this.vagaId) {
      try {
       // await this.vagaService.updateVaga(this.vagaId, this.vaga);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('telainicial');
      } catch(error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }

    } else {
     // this.vaga.criacao = new Date().getTime();

      try {
      //  await this.vagaService.addVaga(this.vaga);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('telainicial');
      } catch(error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
