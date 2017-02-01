/**
 * Classe responsável por adicionar mensagens para o usuário
 *
 */
export class AlertaUtil {
    /* Alert component */
    public alerts: Array < Object > ;

    public closeAlert(i: number): void {
        this.alerts.splice(i, 1);
    }

    /*
     * Método  para adicionar mensagem na tela.
     * Pode-se passar uma lista de mensagens.
     * Exemplo:
     *	{
     *    type: 'danger',
     *    msg: 'Oh snap! Change a few things up and try submitting again.'
     *  },
     *  {
     *    type: 'success',
     *    msg: 'Well done! You successfully read this important alert message.',
     *    closable: true
     *  }
     */
    public addMessage(...objMessage: any[]): void {
            this.alerts = new Array();
            for (var i = objMessage.length - 1; i >= 0; i--) {
                this.alerts.push(objMessage[i]);
            }
        }
        /* END*/
}
