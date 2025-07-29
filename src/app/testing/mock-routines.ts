export const mockRoutinesResponse = {
  "data": [
    {
      "id": "1",
      "type": "routine",
      "attributes": {
        "name": "Advanced Routine",
        "description": "This is a new Intermediate routine.",
        "difficulty": "Advanced",
        "routine_poses": [
          {
            "pose_id": 33,
            "name": "Reverse Warrior",
            "sanskrit_name": "Parsva Virabhadrasana",
            "translation_name": "pārśva = side, vīrabhadra = warrior, āsana = posture",
            "description": "From warrior II , the lower body stays static while the upper body arches back in a gentle back bend.  The top arm is extended back with the bicep by the ear and the fingers spread wide.  The other arm slides down the back leg resting on the thigh or shin, but not the knee joint.  The gaze is up towards the sky.",
            "pose_benefits": "Strengthens and stretches the legs, knees, and ankles.  Stretches the groin, spine, waist, chest, lungs, and shoulders.  Stimulates abdominal organs.  Increases stamina.  Relieves backaches, especially through second trimester of pregnancy.  Therapeutic for carpal tunnel syndrome, flat feet, infertility, osteoporosis, and sciatica.",
            "image_url": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483089/yoga-api/29_ww7bot.svg"
          },
          {
            "pose_id": 18,
            "name": "Extended Side Angle",
            "sanskrit_name": "Utthita Parsvakonasana",
            "translation_name": "utthita = extended, pārśva = side, koṇa = angle, āsana = posture",
            "description": "From warrior II the lower body stays static while the upper body is folded forward at the crease of the hip.  One arm is extended toward the front with the bicep by the ear and the fingers spread wide while the other reaches down to the earth on the inside of the thigh.  The upper torso and the gaze twist up towards the sky.",
            "pose_benefits": "Strengthens and stretches the legs, knees, and ankles.  Stretches the groin, spine, waist, chest, lungs, and shoulders. Stimulates abdominal organs. Increases stamina.",
            "image_url": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/18_aqufak.svg"
          }
        ]
      }
    },
    {
      "id": "2",
      "type": "routine",
      "attributes": {
        "name": "New Routine",
        "description": "This is a new routine for testing this endpoint.",
        "difficulty": "Beginner",
        "routine_poses": [
          {
            "pose_id": 8,
            "name": "Child's Pose",
            "sanskrit_name": "Balasana",
            "translation_name": "bala = child, āsana = posture",
            "description": "From a kneeling position, the toes and knees are together with most of the weight of the body resting on the heels of the feet.  The arms are extended back resting alongside the legs.  The forehead rests softly onto the earth.  The gaze is down and inward.",
            "pose_benefits": "Gently stretches the hips, thighs, and ankles.  Calms the brain and helps relieve stress and fatigue.  Relieves back and neck pain when done with head and torso supported.",
            "image_url": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.svg"
          },
          {
            "pose_id": 6,
            "name": "Cat",
            "sanskrit_name": "Marjaryasana",
            "translation_name": "marjarya = cat, āsana = posture",
            "description": "From box neutral shift some weight to the palms.  The wrists, elbows and shoulders are in one line.  The abdomen is pulled in and up with the spine arched in a strong Cobra spine.  The crown of the head is towards the earth and the neck is relaxed.  The gaze is between the arms towards the belly.",
            "pose_benefits": "Relieves the spine and neck. Energizes the body.",
            "image_url": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.svg"
          }
        ]
      }
    }
  ]
};

export const mockRoutineDetailsResponse = {
  "data": {
    "id": "2",
    "type": "routine",
    "attributes": {
      "name": "New Routine",
      "description": "This is a new routine for testing this endpoint.",
      "difficulty": "Beginner",
      "routine_poses": [
        {
          "pose_id": 8,
          "name": "Child's Pose",
          "sanskrit_name": "Balasana",
          "translation_name": "bala = child, āsana = posture",
          "description": "From a kneeling position, the toes and knees are together with most of the weight of the body resting on the heels of the feet.  The arms are extended back resting alongside the legs.  The forehead rests softly onto the earth.  The gaze is down and inward.",
          "pose_benefits": "Gently stretches the hips, thighs, and ankles.  Calms the brain and helps relieve stress and fatigue.  Relieves back and neck pain when done with head and torso supported.",
          "image_url": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483079/yoga-api/10_wzpo85.svg"
        },
        {
          "pose_id": 6,
          "name": "Cat",
          "sanskrit_name": "Marjaryasana",
          "translation_name": "marjarya = cat, āsana = posture",
          "description": "From box neutral shift some weight to the palms.  The wrists, elbows and shoulders are in one line.  The abdomen is pulled in and up with the spine arched in a strong Cobra spine.  The crown of the head is towards the earth and the neck is relaxed.  The gaze is between the arms towards the belly.",
          "pose_benefits": "Relieves the spine and neck. Energizes the body.",
          "image_url": "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483075/yoga-api/7_a6aspg.svg"
        }
      ]
    }
  }
}