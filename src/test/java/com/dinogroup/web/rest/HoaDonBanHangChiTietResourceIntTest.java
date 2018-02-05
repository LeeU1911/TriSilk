package com.dinogroup.web.rest;

import com.dinogroup.TriSilkApp;

import com.dinogroup.domain.HoaDonBanHangChiTiet;
import com.dinogroup.repository.HoaDonBanHangChiTietRepository;
import com.dinogroup.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.dinogroup.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HoaDonBanHangChiTietResource REST controller.
 *
 * @see HoaDonBanHangChiTietResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TriSilkApp.class)
public class HoaDonBanHangChiTietResourceIntTest {

    private static final LocalDate DEFAULT_NGAY_BAN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NGAY_BAN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TEN_KHACH_HANG = "AAAAAAAAAA";
    private static final String UPDATED_TEN_KHACH_HANG = "BBBBBBBBBB";

    private static final Float DEFAULT_SO_MET = 1F;
    private static final Float UPDATED_SO_MET = 2F;

    private static final Float DEFAULT_DON_GIA = 1F;
    private static final Float UPDATED_DON_GIA = 2F;

    private static final Float DEFAULT_TONG_TIEN = 1F;
    private static final Float UPDATED_TONG_TIEN = 2F;

    @Autowired
    private HoaDonBanHangChiTietRepository hoaDonBanHangChiTietRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHoaDonBanHangChiTietMockMvc;

    private HoaDonBanHangChiTiet hoaDonBanHangChiTiet;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HoaDonBanHangChiTietResource hoaDonBanHangChiTietResource = new HoaDonBanHangChiTietResource(hoaDonBanHangChiTietRepository);
        this.restHoaDonBanHangChiTietMockMvc = MockMvcBuilders.standaloneSetup(hoaDonBanHangChiTietResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HoaDonBanHangChiTiet createEntity(EntityManager em) {
        HoaDonBanHangChiTiet hoaDonBanHangChiTiet = new HoaDonBanHangChiTiet()
            .ngayBan(DEFAULT_NGAY_BAN)
            .tenKhachHang(DEFAULT_TEN_KHACH_HANG)
            .soMet(DEFAULT_SO_MET)
            .donGia(DEFAULT_DON_GIA)
            .tongTien(DEFAULT_TONG_TIEN);
        return hoaDonBanHangChiTiet;
    }

    @Before
    public void initTest() {
        hoaDonBanHangChiTiet = createEntity(em);
    }

    @Test
    @Transactional
    public void createHoaDonBanHangChiTiet() throws Exception {
        int databaseSizeBeforeCreate = hoaDonBanHangChiTietRepository.findAll().size();

        // Create the HoaDonBanHangChiTiet
        restHoaDonBanHangChiTietMockMvc.perform(post("/api/hoa-don-ban-hang-chi-tiets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHangChiTiet)))
            .andExpect(status().isCreated());

        // Validate the HoaDonBanHangChiTiet in the database
        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeCreate + 1);
        HoaDonBanHangChiTiet testHoaDonBanHangChiTiet = hoaDonBanHangChiTietList.get(hoaDonBanHangChiTietList.size() - 1);
        assertThat(testHoaDonBanHangChiTiet.getNgayBan()).isEqualTo(DEFAULT_NGAY_BAN);
        assertThat(testHoaDonBanHangChiTiet.getTenKhachHang()).isEqualTo(DEFAULT_TEN_KHACH_HANG);
        assertThat(testHoaDonBanHangChiTiet.getSoMet()).isEqualTo(DEFAULT_SO_MET);
        assertThat(testHoaDonBanHangChiTiet.getDonGia()).isEqualTo(DEFAULT_DON_GIA);
        assertThat(testHoaDonBanHangChiTiet.getTongTien()).isEqualTo(DEFAULT_TONG_TIEN);
    }

    @Test
    @Transactional
    public void createHoaDonBanHangChiTietWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = hoaDonBanHangChiTietRepository.findAll().size();

        // Create the HoaDonBanHangChiTiet with an existing ID
        hoaDonBanHangChiTiet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHoaDonBanHangChiTietMockMvc.perform(post("/api/hoa-don-ban-hang-chi-tiets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHangChiTiet)))
            .andExpect(status().isBadRequest());

        // Validate the HoaDonBanHangChiTiet in the database
        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNgayBanIsRequired() throws Exception {
        int databaseSizeBeforeTest = hoaDonBanHangChiTietRepository.findAll().size();
        // set the field null
        hoaDonBanHangChiTiet.setNgayBan(null);

        // Create the HoaDonBanHangChiTiet, which fails.

        restHoaDonBanHangChiTietMockMvc.perform(post("/api/hoa-don-ban-hang-chi-tiets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHangChiTiet)))
            .andExpect(status().isBadRequest());

        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSoMetIsRequired() throws Exception {
        int databaseSizeBeforeTest = hoaDonBanHangChiTietRepository.findAll().size();
        // set the field null
        hoaDonBanHangChiTiet.setSoMet(null);

        // Create the HoaDonBanHangChiTiet, which fails.

        restHoaDonBanHangChiTietMockMvc.perform(post("/api/hoa-don-ban-hang-chi-tiets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHangChiTiet)))
            .andExpect(status().isBadRequest());

        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDonGiaIsRequired() throws Exception {
        int databaseSizeBeforeTest = hoaDonBanHangChiTietRepository.findAll().size();
        // set the field null
        hoaDonBanHangChiTiet.setDonGia(null);

        // Create the HoaDonBanHangChiTiet, which fails.

        restHoaDonBanHangChiTietMockMvc.perform(post("/api/hoa-don-ban-hang-chi-tiets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHangChiTiet)))
            .andExpect(status().isBadRequest());

        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllHoaDonBanHangChiTiets() throws Exception {
        // Initialize the database
        hoaDonBanHangChiTietRepository.saveAndFlush(hoaDonBanHangChiTiet);

        // Get all the hoaDonBanHangChiTietList
        restHoaDonBanHangChiTietMockMvc.perform(get("/api/hoa-don-ban-hang-chi-tiets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hoaDonBanHangChiTiet.getId().intValue())))
            .andExpect(jsonPath("$.[*].ngayBan").value(hasItem(DEFAULT_NGAY_BAN.toString())))
            .andExpect(jsonPath("$.[*].tenKhachHang").value(hasItem(DEFAULT_TEN_KHACH_HANG.toString())))
            .andExpect(jsonPath("$.[*].soMet").value(hasItem(DEFAULT_SO_MET.doubleValue())))
            .andExpect(jsonPath("$.[*].donGia").value(hasItem(DEFAULT_DON_GIA.doubleValue())))
            .andExpect(jsonPath("$.[*].tongTien").value(hasItem(DEFAULT_TONG_TIEN.doubleValue())));
    }

    @Test
    @Transactional
    public void getHoaDonBanHangChiTiet() throws Exception {
        // Initialize the database
        hoaDonBanHangChiTietRepository.saveAndFlush(hoaDonBanHangChiTiet);

        // Get the hoaDonBanHangChiTiet
        restHoaDonBanHangChiTietMockMvc.perform(get("/api/hoa-don-ban-hang-chi-tiets/{id}", hoaDonBanHangChiTiet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hoaDonBanHangChiTiet.getId().intValue()))
            .andExpect(jsonPath("$.ngayBan").value(DEFAULT_NGAY_BAN.toString()))
            .andExpect(jsonPath("$.tenKhachHang").value(DEFAULT_TEN_KHACH_HANG.toString()))
            .andExpect(jsonPath("$.soMet").value(DEFAULT_SO_MET.doubleValue()))
            .andExpect(jsonPath("$.donGia").value(DEFAULT_DON_GIA.doubleValue()))
            .andExpect(jsonPath("$.tongTien").value(DEFAULT_TONG_TIEN.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHoaDonBanHangChiTiet() throws Exception {
        // Get the hoaDonBanHangChiTiet
        restHoaDonBanHangChiTietMockMvc.perform(get("/api/hoa-don-ban-hang-chi-tiets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHoaDonBanHangChiTiet() throws Exception {
        // Initialize the database
        hoaDonBanHangChiTietRepository.saveAndFlush(hoaDonBanHangChiTiet);
        int databaseSizeBeforeUpdate = hoaDonBanHangChiTietRepository.findAll().size();

        // Update the hoaDonBanHangChiTiet
        HoaDonBanHangChiTiet updatedHoaDonBanHangChiTiet = hoaDonBanHangChiTietRepository.findOne(hoaDonBanHangChiTiet.getId());
        // Disconnect from session so that the updates on updatedHoaDonBanHangChiTiet are not directly saved in db
        em.detach(updatedHoaDonBanHangChiTiet);
        updatedHoaDonBanHangChiTiet
            .ngayBan(UPDATED_NGAY_BAN)
            .tenKhachHang(UPDATED_TEN_KHACH_HANG)
            .soMet(UPDATED_SO_MET)
            .donGia(UPDATED_DON_GIA)
            .tongTien(UPDATED_TONG_TIEN);

        restHoaDonBanHangChiTietMockMvc.perform(put("/api/hoa-don-ban-hang-chi-tiets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHoaDonBanHangChiTiet)))
            .andExpect(status().isOk());

        // Validate the HoaDonBanHangChiTiet in the database
        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeUpdate);
        HoaDonBanHangChiTiet testHoaDonBanHangChiTiet = hoaDonBanHangChiTietList.get(hoaDonBanHangChiTietList.size() - 1);
        assertThat(testHoaDonBanHangChiTiet.getNgayBan()).isEqualTo(UPDATED_NGAY_BAN);
        assertThat(testHoaDonBanHangChiTiet.getTenKhachHang()).isEqualTo(UPDATED_TEN_KHACH_HANG);
        assertThat(testHoaDonBanHangChiTiet.getSoMet()).isEqualTo(UPDATED_SO_MET);
        assertThat(testHoaDonBanHangChiTiet.getDonGia()).isEqualTo(UPDATED_DON_GIA);
        assertThat(testHoaDonBanHangChiTiet.getTongTien()).isEqualTo(UPDATED_TONG_TIEN);
    }

    @Test
    @Transactional
    public void updateNonExistingHoaDonBanHangChiTiet() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonBanHangChiTietRepository.findAll().size();

        // Create the HoaDonBanHangChiTiet

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHoaDonBanHangChiTietMockMvc.perform(put("/api/hoa-don-ban-hang-chi-tiets")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(hoaDonBanHangChiTiet)))
            .andExpect(status().isCreated());

        // Validate the HoaDonBanHangChiTiet in the database
        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHoaDonBanHangChiTiet() throws Exception {
        // Initialize the database
        hoaDonBanHangChiTietRepository.saveAndFlush(hoaDonBanHangChiTiet);
        int databaseSizeBeforeDelete = hoaDonBanHangChiTietRepository.findAll().size();

        // Get the hoaDonBanHangChiTiet
        restHoaDonBanHangChiTietMockMvc.perform(delete("/api/hoa-don-ban-hang-chi-tiets/{id}", hoaDonBanHangChiTiet.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HoaDonBanHangChiTiet> hoaDonBanHangChiTietList = hoaDonBanHangChiTietRepository.findAll();
        assertThat(hoaDonBanHangChiTietList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HoaDonBanHangChiTiet.class);
        HoaDonBanHangChiTiet hoaDonBanHangChiTiet1 = new HoaDonBanHangChiTiet();
        hoaDonBanHangChiTiet1.setId(1L);
        HoaDonBanHangChiTiet hoaDonBanHangChiTiet2 = new HoaDonBanHangChiTiet();
        hoaDonBanHangChiTiet2.setId(hoaDonBanHangChiTiet1.getId());
        assertThat(hoaDonBanHangChiTiet1).isEqualTo(hoaDonBanHangChiTiet2);
        hoaDonBanHangChiTiet2.setId(2L);
        assertThat(hoaDonBanHangChiTiet1).isNotEqualTo(hoaDonBanHangChiTiet2);
        hoaDonBanHangChiTiet1.setId(null);
        assertThat(hoaDonBanHangChiTiet1).isNotEqualTo(hoaDonBanHangChiTiet2);
    }
}
