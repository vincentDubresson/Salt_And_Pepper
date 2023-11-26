export default function sommeHeuresMinutesFormatees(
  preparationTime: string,
  restingTime: string,
  cookingTime: string
) {
  // Fonction pour calculer la somme des heures et des minutes des trois dates
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

    // Ajuster les heures si les minutes dépassent 60
    if (totalMinutes >= 60) {
      totalHeures += Math.floor(totalMinutes / 60);
      totalMinutes = totalMinutes % 60;
    }

    return { heures: totalHeures, minutes: totalMinutes };
  }

  // Fonction pour formater la sortie
  function formaterHeuresMinutes(heures: number, minutes: number) {
    return heures + 'h' + (minutes < 10 ? '0' : '') + minutes;
  }

  // Calculer la somme des heures et des minutes
  const resultatSomme = sommeHeuresMinutes(
    preparationTime,
    restingTime,
    cookingTime
  );

  // Formater et retourner le résultat
  return formaterHeuresMinutes(resultatSomme.heures, resultatSomme.minutes);
}
