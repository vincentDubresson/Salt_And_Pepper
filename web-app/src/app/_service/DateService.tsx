export default class DateService {
  static sommeHeuresMinutesFormatees(
    preparationTime: string,
    restingTime: string,
    cookingTime: string
  ) {
    function sommeHeuresMinutes(
      preparationTime: string,
      restingTime: string,
      cookingTime: string
    ) {
      const date1 = new Date(preparationTime);
      const date2 = new Date(restingTime);
      const date3 = new Date(cookingTime);

      let totalHeures = date1.getUTCHours() + date2.getUTCHours() + date3.getUTCHours();
      let totalMinutes =
        date1.getUTCMinutes() + date2.getUTCMinutes() + date3.getUTCMinutes();

      if (totalMinutes >= 60) {
        totalHeures += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;
      }

      return { heures: totalHeures, minutes: totalMinutes };
    }

    function formaterHeuresMinutes(heures: number, minutes: number) {
      return heures + 'h' + (minutes < 10 ? '0' : '') + minutes;
    }

    const resultatSomme = sommeHeuresMinutes(
      preparationTime,
      restingTime,
      cookingTime
    );

    return formaterHeuresMinutes(resultatSomme.heures, resultatSomme.minutes);
  }

  static formatHeuresMinutes(dateString: string) {
    const date = new Date(dateString);

    const heures = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const heuresFormat = heures < 10 ? '0' + heures : heures;
    const minutesFormat = minutes < 10 ? '0' + minutes : minutes;

    return `${heuresFormat}h${minutesFormat}`;
  }
}
