


export type FAQItem = {
    question: string;
    answer: string;
}

export type FAQSection ={
    category:string;
    items: FAQItem[];
}


const faqData: FAQSection[] = [
  {
    category: 'Confinement Meals',
    items: [
      {
        question: 'What is Confinement food?',
        answer: `The emphasis of confinement food is to ensure that mothers gain the essential nutrients during their postnatal recovery. Consuming the right food cooked in the right manner would help revitalize your body’s immune system, expel ‘wind’ from the body, strengthen your joints and support healthy lactation and improve blood circulation.
                At Chilli Padi, we seek not just to maintain the Chinese confinement food tradition but also to innovate and create fusion dishes to satisfy the taste buds of modern mummies!`,
      },
      { question: 'Are your confinement meals Halal?', answer: 'Apologies, our confinement meals are not halal.' },
      { question: 'How long is the Confinement period and are the dishes different each week?', answer: `A typical confinement period would last 4 weeks and our meals are designed to cater to your dietary requirements through this period.
                  Recovery Stage Day 1 - 7 confinement meals' purpose is to expel the ‘wind’ in the body and also has detoxification effect especially to drive out the stale blood from the body. 
                  Nourish Stage Day 8 - 28 confinement meals are to replenish your ‘Qi’ regulate and balance the bodily functions as well as boosting the immune system for postnatal recovery` },
      { question:'I intend to breastfeed my child, does your food promote lactaion and how it benefits me?', answer: `We have incorporated ingredients that promotes lactation into our confinement menu such as Green Papaya, Spinach and Salmon.
                  Green Papaya is popular as a galactagogue as it increases the production of oxytocin hormones which helps regulate the production of milk and is also rich in Vitamins. It is a must-have super food for lactating moms!
                  As for Spinach, it is rich in Iron and is effective in replenishing your iron levels. Studies have shown that low iron levels are associated with low milk supply. Hence, our confinement meals are deftly crafted to replenish your nutrients and to balance your body.
                  Fish such as Salmon are a great source of Omega-3 (DHA) which is vital for healthy brain development and function in babies. While breastfeeding, the mummy’s own supply of Omega-3 will diminish, hence this ensures mummies will get their intake of Omega-3.`
      },
      { question:'What should I avoid?', answer: `Post-partum meals place emphasis on keeping the body warm. Traditional beliefs are that post-partum mothers should avoid cooling foods; such as melons and shellfish in general. 
                  It is advisable to consume dishes which has wine, old ginger and sesame oil as these help ‘heat’ the body.
                  These ingredients have been incorporated into the dishes we provide for our confinement meals.`
      },
      { question: 'Does ginger cause jaundice in babies?', answer: 'There has been no evidence that ginger consumed by breastfeeding mothers would cause a baby to be jaundiced. Ginger can be taken during confinement and breastfeeding.' },
      { question: 'How important is it to incorporate soups into the diet of mothers going through Confinement?', answer: `Most soups provided with our meals are double boiled. The Double boiling technique is a slow and gentle process which better extract the flavour, essence and nutrients of the ingredients and offers maximum benefit to post-partum mums for their recovery.
                  Fish and Papaya Soup are also incorporated into the confinement meals we provide, and are beneficial for mummies who intend to breastfeed. `}
    ],
  },
  {
    category: 'Service Fulfillment',
    items: [
      { question: 'What time is the Confinement Meal Delivery?', answer: `Our Confinement Food Delivery Timing is:
                  Lunch: Between 10.00AM to 1.00PM Dinner: Between 4.00PM to 7.00PM
                  *There is no confinement meal delivery on Christmas Day, CNY Eve, CNY  Day 1 and Day 2. Meals would be replaced. *We are unable to guarantee meal delivery at a specific timing as many factors are to be considered such as traffic and weather conditions.`
      },
      { question: 'Where do we delivery?', answer: 'We deliver island wide (strictly to residential address only regardless trial meal or package meal) except Sentosa and Tuas areas.'},
      { question: 'How will Chilli Padi Confinement Meal be delivered?', answer: `Our meals are served using thermal containers (High Quality Tingkat). 
                  *For trial meal & the very last meal of the package, microwavable containers will be used for the meal delivery.`

      },
      {
        question: 'As my due date is only an estimate. What if I delive much earlier or later?',
        answer: 'Once your booking is confirmed, we will deliver the meal upon request even if it is earlier or later. All you would have to do is to inform us 1 working day in advance before 2:00PM (for delivery on weekdays) or 2 working days in advance before 2:00PM (for delivery on weekends and PH) for your confinement meal delivery to commence.',
      },
      { question: 'I do not take certain ingredients; can I request to remove or replace the dish?', answer: `This will be subjected to availability. Do inform us on the ingredients or dishes that you do not consume, we will try our best to accommodate to your request.
                  As to what the dish will be replaced to, it will be decided by our Chef on the day itself and we will not be able to provide a menu for this.`
      },
      { question: 'Can I upgrade my package ', answer: `Customers may upgrade their package by informing us 3 working days in advance by 2:00PM, before the last day of the package.
                  Customers would have top-up the difference in package price and payment can only be done via Cash or Bank Transfer.`},
      { question: 'How do I commence or postpone my meals?', answer: `Customer may call us at 6914 9900, email us (confinement@chillipadi.com.sg) or chat with us on Messenger.
                  Commencing meal deliveries:
                  Customers would have to inform us 1 working day in advance before 2:00PM (for delivery on weekdays) or 2 working days in advance before 2:00PM (for delivery on weekends and PH) for the commencement of your confinement delivery.
                  Remainder payment of package would have to be made by 3rd Day of meal delivery, failing which Chilli Padi Confinement reserves the rights to terminate the service.
                  Meal postponement:
                  Customers would have to inform us 1 working day in advance before 2:00PM (for delivery on weekdays) or 2 working days in advance before 2:00PM (for delivery on weekends and PH). The meal will be replaced (please note that we only allow maximum 3 postpone dates).
                  In the event that the meal has to be cancelled without sufficient notice provided, there will be no meal replacements and refunds.`
      },
      {
        question: 'Can I change my delivery address?',
        answer: 'Yes you may. Customers would have to inform us 1 working day in advance before 2:00PM (for delivery on weekdays) or 2 working days in advance before 2:00PM (for delivery on weekends and PH) in order for us to make the necessary arrangements.'
      }
    ],
  },
  {
    category: 'Cancellation & Refunds',
    items: [
      { question: 'Cancellation & Refunds', answer: `Cancellation of service:
                  There would be strictly no cancellation for package purchased.
                  Once cancelled the package cannot be reinstated.
                  Refunds:
                  There would be strictly no refunds for package purchased.`
      }
    ],
  },
  {
    category: 'Add-Ons',
    items: [
      { question: 'Add-Ons Product', answer: `Add-Ons:
                  Only available with purchase of any confinement meal packages. Not available for ala carte orders.`
      }
    ],
  },
  {
    category: 'BMB Postnatal Massage Services',
    items: [
      { question: 'When should I begin Postnatal Massages?', answer: `For natural delivery, massage sessions will begin after 7 days. 
                  For caesarean section (C-section), BMB recommend beginning sessions after 3 weeks or with the recommendation of your gynae. Before then, mummies can still be massaged on other parts of their body to soothe body aches. Also relieve water retention, without disturbing the fresh wound on the tummy.`
      },
      {
        question: 'How do I start my message sessions?',
        answer: 'Upon ordering the bundle package through Chilli Padi Confinement website, BMB will reach out to you to arrange your postnatal massage sessions.'
      },
      { question: 'Are products used in massages and facials safe for pregnant mums?', answer: 'All products used are safe for pregnant mums'
      },
      { question: 'Can I change my therapist mid-treatment?', answer: 'A change of therapist can be fulfilled upon request, at no additional cost. If you encounter issues, please contact BMB at 6235 0688 or email them at enquiry@beautymumsbabies.com. '
      },
      { question: 'How do I cancel my session?', answer: 'All cancellations must be communicated to BMB 3 hours in advance, otherwise 1 (one) session may be chargeable.'
      },
      { question: 'What is your cancellation / refun policy?', answer: 'For the full T&C, please click here.'
      }
    ],
  },
  {
    category: 'Bbyeol Solaris UV Sterilizer',
    items: [
      { question: 'When will my Solaris UVC Sterillizer be delivered', answer: 'You can expect your order to be delivered within 5 days from the date of purchase.'
      },
      {
        question: 'Can I change my delivery address?',
        answer: 'Yes you may. Customers would have to inform Chilli Padi Confinement 3 working days in advance in order for us to make the necessary arrangements. Customer may call us at 6914 9900, email us (confinement@chillipadi.com.sg) or chat with us on Messenger.'
      },
      { question: 'What do I do if I miss scheduled delivery?', answer: 'You can reach out to Bbyeol by calling them at 6481 4572. However, rest assured that Bbyeol will reach out to you prior to the delivery to confirm the timing.'
      },
      { question: 'What is the warranty like?', answer: 'Kindly refer to Bbyeol’s Product Registration & Warranty FAQ page for the details.'
      },
    ],
  }
];

export default faqData;