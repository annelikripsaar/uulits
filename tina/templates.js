export function alamen__Fields() {
  return [
    {
      type: "string",
      name: "slug",
      label: "URL-i sõbralik nimi",
    },
    {
      type: "string",
      name: "title",
      label: "Pealkiri",
    },
    {
      type: "number",
      name: "order",
      label: "Järjekord",
    },
    {
      type: "boolean",
      name: "in_nav",
      label: "Navigatsioonis",
    },
    {
      type: "string",
      name: "parent_slug",
      label: "Vanemleht",
    },
    {
      type: "boolean",
      name: "new",
      label: "Uus",
    },
  ];
}
export function kontaktFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "string",
      name: "slug",
      label: "slug",
    },
    {
      type: "number",
      name: "order",
      label: "order",
    },
    {
      type: "boolean",
      name: "in_nav",
      label: "in_nav",
    },
    {
      type: "string",
      name: "address",
      label: "address",
    },
    {
      type: "string",
      name: "address_extra",
      label: "address_extra",
    },
    {
      type: "number",
      name: "lat",
      label: "lat",
    },
    {
      type: "number",
      name: "lng",
      label: "lng",
    },
  ];
}
export function men__Fields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Nimi",
      required: true,
    },
    {
      type: "string",
      name: "slug",
      label: "Nimi aadressiribal",
      required: true,
    },
    {
      type: "number",
      name: "order",
      label: "Järjestus",
    },
    {
      type: "boolean",
      name: "in_nav",
      label: "Navigatsioonis",
    },
  ];
}
export function food_truck_lehtFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Nimi",
    },
    {
      type: "string",
      name: "slug",
      label: "Nimi aadressiribal",
      required: true,
    },
    {
      type: "number",
      name: "order",
      label: "Järjestus",
    },
    {
      type: "image",
      name: "featured_image",
      label: "Pilt teksti kõrval",
    },
    {
      type: "string",
      name: "extra",
      label: "Lisatekst",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image",
      name: "video",
      label: "Video",
    },
  ];
}
export function tavaline_lehtFields() {
  return [
    {
      type: "string",
      name: "slug",
      label: "slug",
    },
    {
      type: "string",
      name: "title",
      label: "title",
    },
    {
      type: "boolean",
      name: "in_nav",
      label: "in_nav",
    },
  ];
}
