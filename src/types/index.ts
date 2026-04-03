export type Database = {
  public: {
    Tables: {
      sets: {
        Row: {
          id: string;
          name: string;
          year: number;
          series: string;
          total_cards: number;
          image_url: string | null;
          description: string | null;
          release_date: string | null;
          artists: string | null;
          notable: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          year: number;
          series: string;
          total_cards: number;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          year?: number;
          series?: string;
          total_cards?: number;
          image_url?: string | null;
          created_at?: string;
        };
      };
      cards: {
        Row: {
          id: string;
          set_id: string;
          number: string;
          name_a: string;
          name_b: string | null;
          image_url_a: string | null;
          image_url_b: string | null;
          is_parallel: boolean;
          parallel_type: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          set_id: string;
          number: string;
          name_a: string;
          name_b?: string | null;
          image_url_a?: string | null;
          image_url_b?: string | null;
          is_parallel?: boolean;
          parallel_type?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          set_id?: string;
          number?: string;
          name_a?: string;
          name_b?: string | null;
          image_url_a?: string | null;
          image_url_b?: string | null;
          is_parallel?: boolean;
          parallel_type?: string | null;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_cards: {
        Row: {
          id: string;
          user_id: string;
          card_id: string;
          status: "have" | "want" | "for_sale" | "for_trade";
          quantity: number;
          condition: string | null;
          notes: string | null;
          price_cents: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          card_id: string;
          status: "have" | "want" | "for_sale" | "for_trade";
          quantity?: number;
          condition?: string | null;
          notes?: string | null;
          price_cents?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          card_id?: string;
          status?: "have" | "want" | "for_sale" | "for_trade";
          quantity?: number;
          condition?: string | null;
          notes?: string | null;
          price_cents?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trades: {
        Row: {
          id: string;
          proposer_id: string;
          receiver_id: string;
          status: "pending" | "accepted" | "rejected" | "cancelled";
          message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          proposer_id: string;
          receiver_id: string;
          status?: "pending" | "accepted" | "rejected" | "cancelled";
          message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          proposer_id?: string;
          receiver_id?: string;
          status?: "pending" | "accepted" | "rejected" | "cancelled";
          message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      trade_items: {
        Row: {
          id: string;
          trade_id: string;
          card_id: string;
          offered_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          trade_id: string;
          card_id: string;
          offered_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          trade_id?: string;
          card_id?: string;
          offered_by?: string;
          created_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          card_id: string;
          price_cents: number;
          condition: string;
          description: string | null;
          status: "active" | "sold" | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          card_id: string;
          price_cents: number;
          condition: string;
          description?: string | null;
          status?: "active" | "sold" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          card_id?: string;
          price_cents?: number;
          condition?: string;
          description?: string | null;
          status?: "active" | "sold" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      card_status: "have" | "want" | "for_sale" | "for_trade";
      trade_status: "pending" | "accepted" | "rejected" | "cancelled";
      listing_status: "active" | "sold" | "cancelled";
    };
  };
};

// Convenience types
export type Set = Database["public"]["Tables"]["sets"]["Row"];
export type Card = Database["public"]["Tables"]["cards"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type UserCard = Database["public"]["Tables"]["user_cards"]["Row"];
export type Trade = Database["public"]["Tables"]["trades"]["Row"];
export type TradeItem = Database["public"]["Tables"]["trade_items"]["Row"];
export type Listing = Database["public"]["Tables"]["listings"]["Row"];

// Card with its set info (common join)
export type CardWithSet = Card & { sets: Set };

// User card with card and set info (for collection views)
export type UserCardWithDetails = UserCard & {
  cards: CardWithSet;
};
