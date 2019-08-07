import {JetView} from "webix-jet";

export default class HelperTemplate extends JetView {
	config() {
		const ui = {
			rows: [
				{
					height: 50,
					template: "Please, select the group and start learning words! For now you could learn the text below!"
				},
				{
					cols: [
						{
							template: "Когда приходит лето, в городе становится жарко и душно. Хочется как можно быстрее оставить работу, получить отпуск и отправиться куда-нибудь. Конечно, многие люди выбирают поездку на море. Первое, что мы обычно делаем, планируя отпуск, это выбираем наиболее подходящее для себя направление. Некоторые люди предпочитают отдых в своей стране, другие же, наоборот, предпочтут курорт, расположенный за границей. У обоих видов отдыха есть собственные преимущества. В своей стране у Вас не возникает проблем, связанных с незнанием языка, обстановки. Также здесь всегда можно встретить большое количество соотечественников. Русские, желающие отдохнуть на территории своей страны, обычно отправляются на побережье Черного или Азовского морей летом. Здесь расположено много курортов. Сочи, Анапа, Геленджик наиболее популярны. За границей появляется возможность познакомиться с другими культурами, пообщаться с жителями других стран, попрактиковать иностранный язык. Турция, Египет, Болгария, Хорватия, Испания – очень популярные страны для отдыха на море среди русских."
						},
						{
							template: "When summer comes it becomes hot and in the city. There’s a wish to leave work, get a vacation and go somewhere as soon as it is possible. Of course lots of people choose going to the seaside. First thing we usually do when planning a vacation is to choose the most suitable destination for us. Some people prefer holidays (rest) in their own country, others to the contrary will prefer a resort situated abroad. Both of the kinds of rest have their own advantages. In your country you won’t have problems connected with not knowing the language, and the surrounding. Also here you can always meet a alot of compatriots. Those Russians who want to relax in thir own territory usually go at the seaside of the Black and the Azov seas in summer. There are lots of resorts. Sochi, Anapa, Gelendgik are the most popular. And there is an opportunity to get acquainted with new cultures, to communicate with the inhabitants of other countries, to practise foreign language. Turkey, Egypt, Bulgaria, Croatia, Spain are very popular countries for the rest at the seaside among Russians."
						}
					]
				}
			]
		};

		return ui;
	}
}
