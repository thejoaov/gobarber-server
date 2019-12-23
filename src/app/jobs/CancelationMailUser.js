import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelationMailUser {
  get key() {
    return 'CancelationMailUser';
  }

  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.user.name} <${appointment.user.email}>`,
      subject: 'Agendamento cancelado',
      text: 'O agendamento foi cancelado com sucesso',
      template: 'cancelation_user',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelationMailUser();
