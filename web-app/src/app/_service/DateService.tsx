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

      let totalHeures = date1.getHours() + date2.getHours() + date3.getHours();
      let totalMinutes =
        date1.getMinutes() + date2.getMinutes() + date3.getMinutes();

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

    const heures = date.getHours();
    const minutes = date.getMinutes();

    const heuresFormat = heures < 10 ? '0' + heures : heures;
    const minutesFormat = minutes < 10 ? '0' + minutes : minutes;

    return `${heuresFormat}h${minutesFormat}`;
  }
}
