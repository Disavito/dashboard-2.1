export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cuentas: {
        Row: {
          id: number
          name: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
        }
        Relationships: []
      }
      ingresos: {
        Row: {
          id: number
          created_at: string
          account: string
          amount: number
          transaction_type: string
          receipt_number: string | null
          dni: string | null
          full_name: string | null
          numeroOperacion: string | null
          date: string
        }
        Insert: {
          id?: number
          created_at?: string
          account: string
          amount: number
          transaction_type: string
          receipt_number?: string | null
          dni?: string | null
          full_name?: string | null
          numeroOperacion?: string | null
          date: string
        }
        Update: {
          id?: number
          created_at?: string
          account?: string
          amount?: number
          transaction_type?: string
          receipt_number?: string | null
          dni?: string | null
          full_name?: string | null
          numeroOperacion?: string | null
          date?: string
        }
        Relationships: []
      }
      gastos: {
        Row: {
          id: number
          created_at: string
          account: string
          amount: number
          date: string
          description: string | null
          category: string | null
          sub_category: string | null
          numero_gasto: string | null
          colaborador_id: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          account: string
          amount: number
          date: string
          description?: string | null
          category?: string | null
          sub_category?: string | null
          numero_gasto?: string | null
          colaborador_id?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          account?: string
          amount?: number
          date?: string
          description?: string | null
          category?: string | null
          sub_category?: string | null
          numero_gasto?: string | null
          colaborador_id?: string | null
        }
        Relationships: []
      }
      socio_titulares: {
        Row: {
          id: number
          created_at: string
          dni: string
          nombres: string
          apellidoPaterno: string
          apellidoMaterno: string
          fechaNacimiento: string
          edad: number | null
          celular: string | null
          situacionEconomica: string
          direccionDNI: string
          regionDNI: string
          provinciaDNI: string
          distritoDNI: string
          localidad: string
          regionVivienda: string | null
          provinciaVivienda: string | null
          distritoVivienda: string | null
          direccionVivienda: string | null
          mz: string | null
          lote: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          dni: string
          nombres: string
          apellidoPaterno: string
          apellidoMaterno: string
          fechaNacimiento: string
          edad?: number | null
          celular?: string | null
          situacionEconomica: string
          direccionDNI: string
          regionDNI: string
          provinciaDNI: string
          distritoDNI: string
          localidad: string
          regionVivienda?: string | null
          provinciaVivienda?: string | null
          distritoVivienda?: string | null
          direccionVivienda?: string | null
          mz?: string | null
          lote?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          dni?: string
          nombres?: string
          apellidoPaterno?: string
          apellidoMaterno?: string
          fechaNacimiento?: string
          edad?: number | null
          celular?: string | null
          situacionEconomica?: string
          direccionDNI?: string
          regionDNI?: string
          provinciaDNI?: string
          distritoDNI?: string
          localidad?: string
          regionVivienda?: string | null
          provinciaVivienda?: string | null
          distritoVivienda?: string | null
          direccionVivienda?: string | null
          mz?: string | null
          lote?: string | null
        }
        Relationships: []
      }
      socio_documentos: {
        Row: {
          id: number
          created_at: string
          socio_id: number
          tipo_documento: string
          link_documento: string
        }
        Insert: {
          id?: number
          created_at?: string
          socio_id: number
          tipo_documento: string
          link_documento: string
        }
        Update: {
          id?: number
          created_at?: string
          socio_id?: number
          tipo_documento?: string
          link_documento?: string
        }
        Relationships: [
          {
            foreignKeyName: "socio_documentos_socio_id_fkey"
            columns: ["socio_id"]
            isOneToOne: false
            referencedRelation: "socio_titulares"
            referencedColumns: ["id"]
          }
        ]
      }
      colaboradores: {
        Row: {
          id: string
          created_at: string
          name: string
          apellidos: string
          dni: string
          email: string | null
          phone: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          apellidos: string
          dni: string
          email?: string | null
          phone?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          apellidos?: string
          dni?: string
          email?: string | null
          phone?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          role: string | null
        }
        Insert: {
          id: string
          role?: string | null
        }
        Update: {
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_name"]
          }
        ]
      }
      roles: {
        Row: {
          id: number
          role_name: string
        }
        Insert: {
          id?: number
          role_name: string
        }
        Update: {
          id?: number
          role_name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          user_id: string
          role_id: number
        }
        Insert: {
          user_id: string
          role_id: number
        }
        Update: {
          user_id?: string
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      resource_permissions: {
        Row: {
          id: string
          created_at: string
          role_id: number
          resource_path: string
          can_access: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          role_id: number
          resource_path: string
          can_access?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          role_id?: number
          resource_path?: string
          can_access?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "resource_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
