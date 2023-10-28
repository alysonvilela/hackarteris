export interface Service {
  name: string
  value: number
  cover: string
  team: string[]
  is_distribuitor: boolean
}

export const madeForYouAlbums: Service[] = [
  {
    name: "Netflix",
    value: 5000,
    team: ["55119999999", "55119999999", "55119999999", "55119999999", ],
    is_distribuitor: true,
    cover:
      "https://images.unsplash.com/photo-1627873649417-c67f701f1949?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "HBO Max",
    value: 5000,
    team: ["55119999999", "55119999999"],
    is_distribuitor: false,
    cover:
      "https://images.unsplash.com/photo-1657978738555-354fdd60e147?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
  },
  {
    name: "Disney Plus",
    value: 5000,
    team: ["55119999999", "55119999999", "55119999999", ],
    is_distribuitor: false,
    cover:
      "https://images.unsplash.com/photo-1604883781245-0aca44fff711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "Youtube Premium",
    value: 5000,
    team: ["55119999999", "55119999999", "55119999999", "55119999999", ],
    is_distribuitor: false,
    cover:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
]
