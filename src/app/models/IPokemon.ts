export interface Pokemon {
    height: number;
    weight: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    name: string;
    order: number;
    sprites: Sprites;
    stats: Stat[];
    moves: Move[];
    status?: string;

}

export interface Sprites {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface Stat {
    base_stat: number;
    stat: Stat2;

}

export interface Stat2 {
    name: string;

}

export interface Move {
    move: Move2;
}

export interface Move2 {
    name: string;
    url: string;
}