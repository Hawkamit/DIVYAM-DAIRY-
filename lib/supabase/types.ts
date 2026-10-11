export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json | null
          user_email: string | null
          user_id: string | null
          workspace_id: string
        }
        Insert: {
          action: string
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
          user_email?: string | null
          user_id?: string | null
          workspace_id: string
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
          user_email?: string | null
          user_id?: string | null
          workspace_id?: string
        }
      }
      contact_submissions: {
        Row: {
          admin_notes: string | null
          category: string | null
          created_at: string
          email: string | null
          id: string
          message: string
          name: string
          phone: string
          status: "new" | "contacted" | "resolved" | "archived"
          subject: string | null
          updated_at: string
          website_id: string
        }
        Insert: {
          admin_notes?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name: string
          phone: string
          status?: "new" | "contacted" | "resolved" | "archived"
          subject?: string | null
          updated_at?: string
          website_id: string
        }
        Update: {
          admin_notes?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string
          status?: "new" | "contacted" | "resolved" | "archived"
          subject?: string | null
          updated_at?: string
          website_id?: string
        }
      }
      faqs: {
        Row: {
          answer: string
          answer_hi: string
          category: "products" | "ordering" | "delivery" | "quality" | "storage"
          created_at: string
          id: string
          is_active: boolean
          question: string
          question_hi: string
          sort_order: number
          updated_at: string
          website_id: string
        }
        Insert: {
          answer: string
          answer_hi: string
          category?: "products" | "ordering" | "delivery" | "quality" | "storage"
          created_at?: string
          id?: string
          is_active?: boolean
          question: string
          question_hi: string
          sort_order?: number
          updated_at?: string
          website_id: string
        }
        Update: {
          answer?: string
          answer_hi?: string
          category?: "products" | "ordering" | "delivery" | "quality" | "storage"
          created_at?: string
          id?: string
          is_active?: boolean
          question?: string
          question_hi?: string
          sort_order?: number
          updated_at?: string
          website_id?: string
        }
      }
      inventory: {
        Row: {
          current_stock: number
          id: string
          last_adjusted_at: string
          minimum_threshold: number
          product_id: string
          stock_status: "in_stock" | "low_stock" | "out_of_stock" | "pre_order" | "discontinued"
          unit: string
          updated_at: string
        }
        Insert: {
          current_stock?: number
          id?: string
          last_adjusted_at?: string
          minimum_threshold?: number
          product_id: string
          stock_status?: "in_stock" | "low_stock" | "out_of_stock" | "pre_order" | "discontinued"
          unit?: string
          updated_at?: string
        }
        Update: {
          current_stock?: number
          id?: string
          last_adjusted_at?: string
          minimum_threshold?: number
          product_id?: string
          stock_status?: "in_stock" | "low_stock" | "out_of_stock" | "pre_order" | "discontinued"
          unit?: string
          updated_at?: string
        }
      }
      inventory_transactions: {
        Row: {
          adjustment_type: "addition" | "reduction" | "reconciliation" | "damage"
          created_at: string
          created_by: string | null
          id: string
          inventory_id: string
          new_stock: number
          notes: string | null
          previous_stock: number
          product_id: string
          quantity: number
          reason: string
        }
        Insert: {
          adjustment_type: "addition" | "reduction" | "reconciliation" | "damage"
          created_at?: string
          created_by?: string | null
          id?: string
          inventory_id: string
          new_stock: number
          notes?: string | null
          previous_stock: number
          product_id: string
          quantity: number
          reason: string
        }
        Update: {
          adjustment_type?: "addition" | "reduction" | "reconciliation" | "damage"
          created_at?: string
          created_by?: string | null
          id?: string
          inventory_id?: string
          new_stock?: number
          notes?: string | null
          previous_stock?: number
          product_id?: string
          quantity?: number
          reason?: string
        }
      }
      media_library: {
        Row: {
          alt_text: string | null
          alt_text_hi: string | null
          caption: string | null
          created_at: string
          file_name: string
          file_path: string
          file_size: number
          file_url: string
          folder: "website-assets" | "products" | "pages" | "banners" | "general"
          id: string
          mime_type: string
          title: string | null
          updated_at: string
          uploaded_by: string | null
          website_id: string
        }
        Insert: {
          alt_text?: string | null
          alt_text_hi?: string | null
          caption?: string | null
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number
          file_url: string
          folder?: "website-assets" | "products" | "pages" | "banners" | "general"
          id?: string
          mime_type: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
          website_id: string
        }
        Update: {
          alt_text?: string | null
          alt_text_hi?: string | null
          caption?: string | null
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number
          file_url?: string
          folder?: "website-assets" | "products" | "pages" | "banners" | "general"
          id?: string
          mime_type?: string
          title?: string | null
          updated_at?: string
          uploaded_by?: string | null
          website_id?: string
        }
      }
      pages: {
        Row: {
          content_blocks: Json
          created_at: string
          has_unpublished_changes: boolean
          id: string
          published_blocks: Json
          slug: string
          status: "draft" | "published"
          title: string
          title_hi: string | null
          updated_at: string
          website_id: string
        }
        Insert: {
          content_blocks?: Json
          created_at?: string
          has_unpublished_changes?: boolean
          id?: string
          published_blocks?: Json
          slug: string
          status?: "draft" | "published"
          title: string
          title_hi?: string | null
          updated_at?: string
          website_id: string
        }
        Update: {
          content_blocks?: Json
          created_at?: string
          has_unpublished_changes?: boolean
          id?: string
          published_blocks?: Json
          slug?: string
          status?: "draft" | "published"
          title?: string
          title_hi?: string | null
          updated_at?: string
          website_id?: string
        }
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          name_hi: string
          slug: string
          sort_order: number
          updated_at: string
          website_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          name_hi: string
          slug: string
          sort_order?: number
          updated_at?: string
          website_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          name_hi?: string
          slug?: string
          sort_order?: number
          updated_at?: string
          website_id?: string
        }
      }
      products: {
        Row: {
          base_price: number
          category_id: string | null
          category_key: string
          category_label: string
          category_label_hi: string
          created_at: string
          delivery_coverage: "local" | "all-india"
          fat_spec: string | null
          full_description: Json | null
          full_description_hi: Json | null
          id: string
          images: Json | null
          ingredients: string | null
          ingredients_hi: string | null
          is_available: boolean
          is_featured: boolean
          is_launching_soon: boolean
          is_published: boolean
          key_features: Json | null
          key_features_hi: Json | null
          min_order_note: string | null
          min_order_note_hi: string | null
          name: string
          name_hi: string
          price_range_display: string | null
          price_range_display_hi: string | null
          shelf_life: string | null
          shelf_life_hi: string | null
          short_description: string | null
          short_description_hi: string | null
          slug: string
          snf_spec: string | null
          sort_order: number
          storage_instructions: string | null
          storage_instructions_hi: string | null
          tagline: string | null
          tagline_hi: string | null
          updated_at: string
          variants: Json | null
          website_id: string
        }
        Insert: {
          base_price?: number
          category_id?: string | null
          category_key: string
          category_label: string
          category_label_hi: string
          created_at?: string
          delivery_coverage?: "local" | "all-india"
          fat_spec?: string | null
          full_description?: Json | null
          full_description_hi?: Json | null
          id?: string
          images?: Json | null
          ingredients?: string | null
          ingredients_hi?: string | null
          is_available?: boolean
          is_featured?: boolean
          is_launching_soon?: boolean
          is_published?: boolean
          key_features?: Json | null
          key_features_hi?: Json | null
          min_order_note?: string | null
          min_order_note_hi?: string | null
          name: string
          name_hi: string
          price_range_display?: string | null
          price_range_display_hi?: string | null
          shelf_life?: string | null
          shelf_life_hi?: string | null
          short_description?: string | null
          short_description_hi?: string | null
          slug: string
          snf_spec?: string | null
          sort_order?: number
          storage_instructions?: string | null
          storage_instructions_hi?: string | null
          tagline?: string | null
          tagline_hi?: string | null
          updated_at?: string
          variants?: Json | null
          website_id: string
        }
        Update: {
          base_price?: number
          category_id?: string | null
          category_key?: string
          category_label?: string
          category_label_hi?: string
          created_at?: string
          delivery_coverage?: "local" | "all-india"
          fat_spec?: string | null
          full_description?: Json | null
          full_description_hi?: Json | null
          id?: string
          images?: Json | null
          ingredients?: string | null
          ingredients_hi?: string | null
          is_available?: boolean
          is_featured?: boolean
          is_launching_soon?: boolean
          is_published?: boolean
          key_features?: Json | null
          key_features_hi?: Json | null
          min_order_note?: string | null
          min_order_note_hi?: string | null
          name?: string
          name_hi?: string
          price_range_display?: string | null
          price_range_display_hi?: string | null
          shelf_life?: string | null
          shelf_life_hi?: string | null
          short_description?: string | null
          short_description_hi?: string | null
          slug?: string
          snf_spec?: string | null
          sort_order?: number
          storage_instructions?: string | null
          storage_instructions_hi?: string | null
          tagline?: string | null
          tagline_hi?: string | null
          updated_at?: string
          variants?: Json | null
          website_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          role: "owner" | "admin" | "staff"
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          phone?: string | null
          role?: "owner" | "admin" | "staff"
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          role?: "owner" | "admin" | "staff"
          updated_at?: string
          workspace_id?: string | null
        }
      }
      seo_metadata: {
        Row: {
          canonical_url: string | null
          created_at: string
          description: string
          description_hi: string | null
          id: string
          is_indexable: boolean
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_slug: string
          schema_json: Json | null
          title: string
          title_hi: string | null
          updated_at: string
          website_id: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          description: string
          description_hi?: string | null
          id?: string
          is_indexable?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug: string
          schema_json?: Json | null
          title: string
          title_hi?: string | null
          updated_at?: string
          website_id: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          description?: string
          description_hi?: string | null
          id?: string
          is_indexable?: boolean
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug?: string
          schema_json?: Json | null
          title?: string
          title_hi?: string | null
          updated_at?: string
          website_id?: string
        }
      }
      services: {
        Row: {
          created_at: string
          dispatch_time: string | null
          id: string
          is_active: boolean
          name: string
          name_hi: string
          note: string | null
          note_hi: string | null
          sort_order: number
          status: "home-base" | "active" | "all-india"
          updated_at: string
          website_id: string
        }
        Insert: {
          created_at?: string
          dispatch_time?: string | null
          id?: string
          is_active?: boolean
          name: string
          name_hi: string
          note?: string | null
          note_hi?: string | null
          sort_order?: number
          status?: "home-base" | "active" | "all-india"
          updated_at?: string
          website_id: string
        }
        Update: {
          created_at?: string
          dispatch_time?: string | null
          id?: string
          is_active?: boolean
          name?: string
          name_hi?: string
          note?: string | null
          note_hi?: string | null
          sort_order?: number
          status?: "home-base" | "active" | "all-india"
          updated_at?: string
          website_id?: string
        }
      }
      site_settings: {
        Row: {
          address: string | null
          address_short: string | null
          announcement_banner: Json | null
          brand_name: string
          created_at: string
          email: string | null
          facebook_url: string | null
          fssai_number: string | null
          google_maps_url: string | null
          gst_number: string | null
          id: string
          instagram_url: string | null
          intro_text: string | null
          legal_entity: string
          min_order_ghee: number
          min_order_perishable: number
          phone_primary: string | null
          phone_secondary: string | null
          raw_settings: Json | null
          tagline_en: string | null
          tagline_hi: string | null
          timings: string | null
          updated_at: string
          website_id: string
          whatsapp_digits: string | null
          whatsapp_primary: string | null
          whatsapp_secondary: string | null
        }
        Insert: {
          address?: string | null
          address_short?: string | null
          announcement_banner?: Json | null
          brand_name?: string
          created_at?: string
          email?: string | null
          facebook_url?: string | null
          fssai_number?: string | null
          google_maps_url?: string | null
          gst_number?: string | null
          id?: string
          instagram_url?: string | null
          intro_text?: string | null
          legal_entity?: string
          min_order_ghee?: number
          min_order_perishable?: number
          phone_primary?: string | null
          phone_secondary?: string | null
          raw_settings?: Json | null
          tagline_en?: string | null
          tagline_hi?: string | null
          timings?: string | null
          updated_at?: string
          website_id: string
          whatsapp_digits?: string | null
          whatsapp_primary?: string | null
          whatsapp_secondary?: string | null
        }
        Update: {
          address?: string | null
          address_short?: string | null
          announcement_banner?: Json | null
          brand_name?: string
          created_at?: string
          email?: string | null
          facebook_url?: string | null
          fssai_number?: string | null
          google_maps_url?: string | null
          gst_number?: string | null
          id?: string
          instagram_url?: string | null
          intro_text?: string | null
          legal_entity?: string
          min_order_ghee?: number
          min_order_perishable?: number
          phone_primary?: string | null
          phone_secondary?: string | null
          raw_settings?: Json | null
          tagline_en?: string | null
          tagline_hi?: string | null
          timings?: string | null
          updated_at?: string
          website_id?: string
          whatsapp_digits?: string | null
          whatsapp_primary?: string | null
          whatsapp_secondary?: string | null
        }
      }
      testimonials: {
        Row: {
          author_name: string
          author_name_hi: string | null
          avatar_url: string | null
          content: string
          content_hi: string | null
          created_at: string
          id: string
          is_active: boolean
          is_featured: boolean
          rating: number
          role_or_location: string
          role_or_location_hi: string | null
          sort_order: number
          updated_at: string
          website_id: string
        }
        Insert: {
          author_name: string
          author_name_hi?: string | null
          avatar_url?: string | null
          content: string
          content_hi?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          rating?: number
          role_or_location: string
          role_or_location_hi?: string | null
          sort_order?: number
          updated_at?: string
          website_id: string
        }
        Update: {
          author_name?: string
          author_name_hi?: string | null
          avatar_url?: string | null
          content?: string
          content_hi?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          rating?: number
          role_or_location?: string
          role_or_location_hi?: string | null
          sort_order?: number
          updated_at?: string
          website_id?: string
        }
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          permissions: string[]
          role: "owner" | "admin" | "staff"
          updated_at: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permissions?: string[]
          role?: "owner" | "admin" | "staff"
          updated_at?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permissions?: string[]
          role?: "owner" | "admin" | "staff"
          updated_at?: string
          user_id?: string
          workspace_id?: string
        }
      }
      websites: {
        Row: {
          created_at: string
          domain: string | null
          id: string
          is_default: boolean
          name: string
          status: "published" | "maintenance" | "draft"
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          domain?: string | null
          id?: string
          is_default?: boolean
          name: string
          status?: "published" | "maintenance" | "draft"
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          domain?: string | null
          id?: string
          is_default?: boolean
          name?: string
          status?: "published" | "maintenance" | "draft"
          updated_at?: string
          workspace_id?: string
        }
      }
      workspaces: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
      }
    }
  }
}
