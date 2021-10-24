
let dollhouse =
{
  id: '490d221f-7672-4d58-ac80-88f6764a8a27',
  name: 'Dollhouse',
  //background: 'https://eemfoo.org/ccarchive/Other/Assets/Moe/Background%20Images/Hydrocea/massivepreview.png',
  //background: 'https://eemfoo.org/ccarchive/Other/Assets/Moe/Background%20Images/Hydrocea/hydrocea5.jpg',
  background: 'https://github.com/Lantoniar/dollhouse/raw/main/artAssets/background/dh_background.bmp',
  x: 0,
  y: 0,
  width: 2221,
  height: 1008,
  rooms: {
    '14b55b5b-acf0-4225-9887-1b56a55d7d17': {
      id: '14b55b5b-acf0-4225-9887-1b56a55d7d17',
      leftX: 100,
      rightX: 200,
      leftCeilingY: 100,
      rightCeilingY: 80,
      leftFloorY: 200,
      rightFloorY: 220,
    },
    'a998f3ee-3180-47ec-8226-e449211e01b2': {
      id: 'a998f3ee-3180-47ec-8226-e449211e01b2',
      leftX: 200,
      rightX: 300,
      leftCeilingY: 80,
      rightCeilingY: 100,
      leftFloorY: 220,
      rightFloorY: 200,
    },
    '663fa284-e40e-4f24-bd6d-5f155c9371bc': {
      id: '663fa284-e40e-4f24-bd6d-5f155c9371bc',
      leftX: 200,
      rightX: 300,
      leftCeilingY: 220,
      rightCeilingY: 200,
      leftFloorY: 300,
      rightFloorY: 300,
    },
    '61bcc613-6c42-4784-aa3a-4069ec8b7aea': {
      id: '61bcc613-6c42-4784-aa3a-4069ec8b7aea',
      leftX: 100,
      rightX: 200,
      leftCeilingY: 250,
      rightCeilingY: 250,
      leftFloorY: 300,
      rightFloorY: 300,
    },
    '5d069dcd-c284-4d25-b52f-2c7e4b92d19d': {
      id: '5d069dcd-c284-4d25-b52f-2c7e4b92d19d',
      leftX: 300,
      rightX: 400,
      leftCeilingY: 100,
      rightCeilingY: 100,
      leftFloorY: 300,
      rightFloorY: 280,
    },
    '697a9c1c-4aad-4522-9e6c-1b1c241f071d': {
      id: '697a9c1c-4aad-4522-9e6c-1b1c241f071d',
      leftX: 400,
      rightX: 500,
      leftCeilingY: 150,
      rightCeilingY: 150,
      leftFloorY: 230,
      rightFloorY: 230,
    },
    '6143297a-7c91-4520-9256-d0b512f64bae': {
      id: '6143297a-7c91-4520-9256-d0b512f64ba',
      leftX: 425,
      rightX: 475,
      leftCeilingY: 230,
      rightCeilingY: 230,
      leftFloorY: 280,
      rightFloorY: 280,
    }
  },
  "perms": [
      {
          "rooms": {
              "a": '14b55b5b-acf0-4225-9887-1b56a55d7d17',
              "b": 'a998f3ee-3180-47ec-8226-e449211e01b2',
          },
          "permeability": 1.0
      },
      {
          "rooms": {
              "a": 'a998f3ee-3180-47ec-8226-e449211e01b2',
              "b": '663fa284-e40e-4f24-bd6d-5f155c9371bc',
          },
          "permeability": 0.5
      },
      {
          "rooms": {
              "a": '663fa284-e40e-4f24-bd6d-5f155c9371bc',
              "b": '61bcc613-6c42-4784-aa3a-4069ec8b7aea',
          },
          "permeability": 0.0
      },
      {
          "rooms": {
              "a": 'a998f3ee-3180-47ec-8226-e449211e01b2',
              "b": '5d069dcd-c284-4d25-b52f-2c7e4b92d19d',
          },
          "permeability": 1.0
      },
      {
          "rooms": {
              "a": '663fa284-e40e-4f24-bd6d-5f155c9371bc',
              "b": '5d069dcd-c284-4d25-b52f-2c7e4b92d19d',
          },
          "permeability": 1.0
      },
      {
          "rooms": {
              "a": '5d069dcd-c284-4d25-b52f-2c7e4b92d19d',
              "b": '697a9c1c-4aad-4522-9e6c-1b1c241f071d',
          },
          "permeability": 1.0
      },
      {
          "rooms": {
              "a": '697a9c1c-4aad-4522-9e6c-1b1c241f071d',
              "b": '6143297a-7c91-4520-9256-d0b512f64bae',
          },
          "permeability": 0.5
      }
  ]
};

module.exports = {
  metaroom: dollhouse,
}
