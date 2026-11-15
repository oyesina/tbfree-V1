/* TB Free — content. DRAFT: all clinical text must be reviewed by the National TB, Leprosy and Buruli Ulcer Control Programme (NTBLCP)
   or a state TB programme before public release. Non-English UI strings need native-speaker review. */
window.LANGS = { en: 'English', pcm: 'Naijá Pidgin', ha: 'Hausa', yo: 'Yorùbá', ig: 'Igbo' };

window.I18N = {
  en: {
    tagline: 'Tuberculosis (TB) is curable. Testing and treatment are free.',
    nav_home: 'Home', nav_check: 'Check', nav_patient: 'My treatment', nav_worker: 'Health worker', nav_policy: 'Policy',
    role_public: 'I want to know about TB', role_check: 'Do I have TB signs?', role_patient: 'I am on TB treatment',
    role_worker: 'I am a health worker', role_policy: 'I plan or fund TB services',
    q_cough2w: 'Cough for 2 weeks or more', q_blood: 'Coughing blood', q_fever: 'Fever', q_sweats: 'Night sweats',
    q_weightloss: 'Losing weight without trying', q_fatigue: 'Unusual tiredness', q_chestpain: 'Chest pain',
    q_contact: 'I live or work closely with someone who has TB', q_hiv: 'I have HIV', q_diabetes: 'I have diabetes',
    q_underweight: 'I am very thin / underfed', q_smoker: 'I smoke', q_priortb: 'I had TB before',
    res_urgent: 'Go to a clinic today. Coughing blood needs urgent care.',
    res_test: 'Please get a free TB test at the nearest government health centre.',
    res_watch: 'You have some risk. See a health worker if symptoms continue or get worse.',
    res_low: 'No TB warning signs selected. If a cough lasts 2 weeks or more, get tested.',
    free_note: 'TB testing and treatment are free at government DOTS centres. You do not need to pay.',
    save: 'Save', clear: 'Delete my data from this phone', took: 'I took my medicine today', taken: 'Done for today'
  },
  pcm: {
    tagline: 'TB fit cure. Test and treatment na free.',
    nav_home: 'Home', nav_check: 'Check', nav_patient: 'My treatment', nav_worker: 'Health worker', nav_policy: 'Policy',
    role_public: 'I wan sabi about TB', role_check: 'I get TB signs?', role_patient: 'I dey take TB drug',
    role_worker: 'I be health worker', role_policy: 'I dey plan or fund TB work',
    q_cough2w: 'Cough wey don reach 2 weeks or more', q_blood: 'I dey cough blood', q_fever: 'Fever', q_sweats: 'Sweat for night',
    q_weightloss: 'Body dey reduce for no reason', q_fatigue: 'Body dey tire me anyhow', q_chestpain: 'Chest dey pain me',
    q_contact: 'I dey stay or work near person wey get TB', q_hiv: 'I get HIV', q_diabetes: 'I get sugar sickness (diabetes)',
    q_underweight: 'I thin well well / I no dey chop well', q_smoker: 'I dey smoke', q_priortb: 'I don get TB before',
    res_urgent: 'Go clinic today. Blood for cough no be small thing.',
    res_test: 'Abeg go government health centre do TB test. E free.',
    res_watch: 'Some risk dey. If the sickness continue or e worse, see health worker.',
    res_low: 'You no pick any TB sign. If cough reach 2 weeks, go test.',
    free_note: 'TB test and drug na free for government DOTS centre. No pay anything.',
    save: 'Save', clear: 'Delete my data from this phone', took: 'I don take my drug today', taken: 'Done for today'
  },
  ha: {
    tagline: 'Tarin fuka (TB) ana iya warkewa. Gwaji da magani kyauta ne.',
    nav_home: 'Gida', nav_check: 'Bincika', nav_patient: 'Maganina', nav_worker: 'Ma’aikacin lafiya', nav_policy: 'Manufa',
    role_public: 'Ina son sanin game da TB', role_check: 'Ina da alamun TB?', role_patient: 'Ina shan maganin TB',
    role_worker: 'Ni ma’aikacin lafiya ne', role_policy: 'Ina tsarawa ko tallafa wa ayyukan TB',
    q_cough2w: 'Tari na makonni 2 ko fiye', q_blood: 'Tari da jini', q_fever: 'Zazzabi', q_sweats: 'Zufa da dare',
    q_weightloss: 'Rama ba dalili', q_fatigue: 'Gajiya mara dalili', q_chestpain: 'Ciwon kirji',
    q_contact: 'Ina zama ko aiki kusa da mai TB', q_hiv: 'Ina da HIV', q_diabetes: 'Ina da ciwon suga',
    q_underweight: 'Na rame sosai / ban samun abinci mai kyau', q_smoker: 'Ina shan taba', q_priortb: 'Na taba yin TB',
    res_urgent: 'Je asibiti yau. Tari da jini yana bukatar kulawa da gaggawa.',
    res_test: 'Don Allah ka je cibiyar lafiya ta gwamnati a yi maka gwajin TB kyauta.',
    res_watch: 'Kana da ɗan haɗari. Ka ga ma’aikacin lafiya idan alamun sun ci gaba.',
    res_low: 'Ba ka zaɓi alamun TB ba. Idan tari ya kai makonni 2, ka yi gwaji.',
    free_note: 'Gwajin TB da magani kyauta ne a cibiyoyin DOTS na gwamnati. Ba sai ka biya komai ba.',
    save: 'Ajiye', clear: 'Share bayanaina daga wayar nan', took: 'Na sha maganina yau', taken: 'An gama na yau'
  },
  yo: {
    tagline: 'Ikọ́ ẹ̀gbẹ (TB) ṣe é wòsàn. Ìdánwò àti ìtọ́jú jẹ́ ọ̀fẹ́.',
    nav_home: 'Ilé', nav_check: 'Ṣàyẹ̀wò', nav_patient: 'Ìtọ́jú mi', nav_worker: 'Òṣìṣẹ́ ìlera', nav_policy: 'Ètò',
    role_public: 'Mo fẹ́ mọ̀ nípa TB', role_check: 'Ṣé mo ní àmì TB?', role_patient: 'Mò ń lo oògùn TB',
    role_worker: 'Òṣìṣẹ́ ìlera ni mí', role_policy: 'Mo ń ṣètò tàbí ń ṣe àtìlẹ́yìn iṣẹ́ TB',
    q_cough2w: 'Ikọ́ ọ̀sẹ̀ méjì tàbí jù bẹ́ẹ̀ lọ', q_blood: 'Ikọ́ ẹ̀jẹ̀', q_fever: 'Ìgbóná ara', q_sweats: 'Òógùn òru',
    q_weightloss: 'Ara ń rù láìsí ìdí', q_fatigue: 'Àárẹ̀ àìlẹ́gbẹ́', q_chestpain: 'Ìrora àyà',
    q_contact: 'Mo ń gbé tàbí ṣiṣẹ́ pẹ̀lú ẹni tó ní TB', q_hiv: 'Mo ní HIV', q_diabetes: 'Mo ní àtọ̀gbẹ',
    q_underweight: 'Mo rù gan-an / n kò jẹun dáadáa', q_smoker: 'Mo ń mu sìgá', q_priortb: 'Mo ti ní TB rí',
    res_urgent: 'Lọ sí ilé-ìwòsàn lónìí. Ikọ́ ẹ̀jẹ̀ nílò ìtọ́jú kíákíá.',
    res_test: 'Jọ̀wọ́ lọ ṣe ìdánwò TB ọ̀fẹ́ ní ilé-ìwòsàn ìjọba tó súnmọ́ ọ.',
    res_watch: 'Ewu díẹ̀ wà. Wá òṣìṣẹ́ ìlera tí àwọn àmì bá tẹ̀síwájú.',
    res_low: 'O kò yan àmì TB kankan. Tí ikọ́ bá pé ọ̀sẹ̀ méjì, lọ ṣe ìdánwò.',
    free_note: 'Ìdánwò àti ìtọ́jú TB jẹ́ ọ̀fẹ́ ní ibùdó DOTS ìjọba. O kò nílò láti sanwó.',
    save: 'Fipamọ́', clear: 'Pa dátà mi rẹ́ lórí fóònù yìí', took: 'Mo ti lo oògùn mi lónìí', taken: 'Ti parí fún òní'
  },
  ig: {
    tagline: 'TB (ụkwara ọkpụkpụ) bụ ọrịa a pụrụ ịgwọ. Nyocha na ọgwụgwọ bụ n’efu.',
    nav_home: 'Ụlọ', nav_check: 'Lelee', nav_patient: 'Ọgwụgwọ m', nav_worker: 'Onye ọrụ ahụike', nav_policy: 'Atụmatụ',
    role_public: 'Achọrọ m ịmata gbasara TB', role_check: 'M nwere ihe mgbaàmà TB?', role_patient: 'Ana m aṅụ ọgwụ TB',
    role_worker: 'Abụ m onye ọrụ ahụike', role_policy: 'Ana m ahazi ma ọ bụ kwado ọrụ TB',
    q_cough2w: 'Ụkwara izu abụọ ma ọ bụ karịa', q_blood: 'Ụkwara na-esi ọbara', q_fever: 'Ahụ ọkụ', q_sweats: 'Mmiri ahụ n’abalị',
    q_weightloss: 'Ahụ na-ebelata na-enweghị ihe kpatara ya', q_fatigue: 'Ọgwụgwụ na-enweghị ihe kpatara ya', q_chestpain: 'Ihe mgbu obi',
    q_contact: 'Ana m ebi ma ọ bụ rụọ ọrụ ọnụ na onye nwere TB', q_hiv: 'M nwere HIV', q_diabetes: 'M nwere ọrịa shuga',
    q_underweight: 'Ahụ m dara ogbenye / anaghị m eri nri ọma', q_smoker: 'Ana m aṅụ sịga', q_priortb: 'M nwebeghị TB tupu mgbe ahụ',
    res_urgent: 'Gaa ụlọ ọgwụ taa. Ụkwara na-esi ọbara chọrọ nlekọta ngwa ngwa.',
    res_test: 'Biko gaa ụlọ ọgwụ gọọmenti nyochaa TB n’efu.',
    res_watch: 'Ị nwere obere ihe ize ndụ. Hụ onye ọrụ ahụike ma ọ bụrụ na mgbaàmà gara n’ihu.',
    res_low: 'Ịhọrọghị mgbaàmà TB ọ bụla. Ọ bụrụ na ụkwara dị izu abụọ, gaa nyochaa.',
    free_note: 'Nyocha na ọgwụgwọ TB bụ n’efu n’ụlọ ọgwụ DOTS gọọmenti. Ịkwụghị ụgwọ.',
    save: 'Chekwaa', clear: 'Hichapụ data m n’ekwentị a', took: 'Aṅụọla m ọgwụ m taa', taken: 'Emechala maka taa'
  }
};

// English-only detailed content (clinical text: review before release)
window.CONTENT = {
  codes: {
    blood: 'Coughing blood can be serious. Go to a clinic or hospital today.',
    cough2w: 'A cough lasting 2 weeks or more is the main warning sign of TB.',
    contact: 'People who live or work closely with someone who has TB should be screened, even without symptoms.',
    multi: 'Several TB-type symptoms together (fever, night sweats, weight loss, tiredness) are a reason to be tested.',
    watch: 'Keep watching. Many illnesses cause these signs, but TB is one of them.',
    hivlink: 'TB and HIV often go together. Ask for an HIV test too, and know that TB is curable even with HIV.'
  },
  nextSteps: [
    'Go to any government hospital or primary health centre. Say: "I have a cough and want a TB test."',
    'Ask for a GeneXpert (rapid molecular) test. It gives a result in about 2 hours and also checks for drug resistance. Not every facility has one; staff can refer you.',
    'You will be asked to give a sputum (phlegm) sample. A deep cough first thing in the morning gives the best sample.',
    'If TB is found, treatment is free and usually 6 months of daily tablets. Most people feel better within weeks, but you must finish all of it.',
    'Cover your mouth when coughing, keep windows open, and sleep in a ventilated room until your health worker says you are no longer infectious.'
  ],
  myths: [
    ['TB is caused by a curse, witchcraft or bad luck.', 'TB is caused by a germ (Mycobacterium tuberculosis) that spreads through the air when a person with lung TB coughs. It is a medical illness.'],
    ['TB cannot be cured.', 'TB is curable with the right drugs taken for the full course. Treatment is free at government DOTS centres.'],
    ['You catch TB by sharing plates, cups or handshakes.', 'TB spreads through the air, not through touching, shared dishes, or sharing a bed linen. Poorly ventilated, crowded rooms are the risk.'],
    ['Once I feel better I can stop the drugs.', 'Stopping early lets the strongest germs survive and can cause drug-resistant TB, which is harder and longer to treat. Finish the full course.'],
    ['People with HIV who get TB will die.', 'People living with HIV can be cured of TB. Treat both: start TB treatment, and HIV treatment as your doctor advises.'],
    ['A person with TB must be isolated from family forever.', 'After the first weeks of proper treatment a person is usually much less infectious. Your health worker will guide you. Family members should be screened.'],
    ['TB only affects poor people or men.', 'Anyone can get TB: women, children and the well-off too. Overcrowding, malnutrition, HIV, diabetes and smoking raise the risk.'],
    ['Children cannot get TB.', 'Children can get TB. Young children living with someone who has TB may need preventive medicine, so tell the clinic about any child at home.']
  ],
  sideEffects: [
    ['Orange or red urine, tears, sweat', 'Normal and harmless. It comes from rifampicin. Keep taking your drugs.', 'ok'],
    ['Mild nausea, loss of appetite', 'Common in the first weeks. Take the drugs as your clinic advises (some people do better with a little food). Tell your health worker if it continues.', 'ok'],
    ['Joint pain', 'Common. Tell your health worker; they can advise safe pain relief.', 'ok'],
    ['Tingling or burning in hands or feet', 'Tell your health worker. A vitamin B6 supplement is often given to prevent and treat this.', 'tell'],
    ['Itchy skin or rash', 'Tell your health worker soon. If the rash is severe or with fever, swollen lips/face, or breathing difficulty, go to hospital immediately.', 'tell'],
    ['Yellow eyes or skin, dark urine (not orange), vomiting that will not stop, belly pain', 'These can be signs of liver problems. Go to the clinic TODAY. Do not stop on your own, but do not take more drugs until you have been seen.', 'urgent'],
    ['Blurred vision or trouble seeing colours', 'Go to the clinic TODAY. Some TB drugs can affect the eyes.', 'urgent'],
    ['Hearing loss, ringing in ears, dizziness (on injectable drugs)', 'Go to the clinic TODAY.', 'urgent']
  ],
  missed: [
    'Missed one dose? Take it as soon as you remember the same day. Do NOT take a double dose the next day.',
    'Missed 2 or more days? Go to the clinic or tell your treatment supporter as soon as you can. Do not wait for your next appointment.',
    'Run out of drugs or travelling? Go to your clinic before you run out. You can be linked to a DOTS centre near where you will be.',
    'Never share your drugs or stop because you feel better.'
  ],
  support: [
    'Eat as well as you can: extra protein and energy foods help recovery. Ask your clinic about food or transport support schemes.',
    'Choose a treatment supporter: a family member, friend, or community volunteer who reminds you and sees you take drugs.',
    'You have the right to confidentiality, care without discrimination, and to keep working or learning once you are no longer infectious.',
    'Ask for an HIV test if you have not had one. Stop smoking and alcohol if you can; both slow healing.',
    'Follow-up sputum tests are done during treatment. Your clinic will tell you when. Attend each one.'
  ],
  workerCodes: {
    test_xpert: 'PRESUMPTIVE TB. Collect sputum and send for Xpert MTB/RIF (or Ultra) as the first test, per the national diagnostic algorithm. If not available on site, arrange sputum transport/referral. Chest X-ray can support diagnosis.',
    hiv_test: 'Offer HIV testing (and counselling) to every presumptive/confirmed TB patient. Screen for diabetes if signs.',
    infection_control: 'Infection control: have the patient wear a mask, cough into an elbow, move waiting out to ventilated space, fast-track the visit.',
    urgent_blood: 'Haemoptysis: assess severity and refer to hospital if heavy or the patient is unwell.',
    tpt_eval: 'Child under 5 contact: after active TB is excluded, evaluate for TB preventive treatment per national guidelines.',
    contact_followup: 'Contact without symptoms: record, educate on symptoms, and re-screen; consider preventive treatment for eligible groups (e.g. children <5, people with HIV) per guidelines.',
    no_signs: 'No presumptive TB. Re-screen if symptoms develop. Educate on warning signs and 2-week cough rule.'
  }
};
